<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Moneroo\Laravel\Payment;
use Throwable;

class PaymentController extends Controller
{
    public function __construct(private readonly Payment $paymentClient)
    {
    }

    /**
     * Initialise un paiement Moneroo pour une commande existante.
     */
    public function initPayment(Request $request)
    {
        $validated = $request->validate([
            'commande_id' => ['required', 'integer', 'exists:commandes,id'],
            'method' => ['nullable', 'string'],
        ]);

        $commande = Commande::with('user')
            ->where('id', $validated['commande_id'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        if ($commande->isPayee()) {
            return redirect()
                ->route('public.commande.success', $commande->id)
                ->with('info', 'Cette commande est déjà réglée.');
        }

        $amount = $this->computeAmountInMinorUnit($commande->total);

        if ($amount <= 0) {
            Log::warning('Commande avec montant invalide pour Moneroo', [
                'commande_id' => $commande->id,
                'total' => $commande->total,
            ]);

            return redirect()
                ->route('public.commande.show', $commande->id)
                ->with('error', 'Le montant de la commande est invalide.');
        }

        if (!empty($validated['method'])) {
            $mode = $this->mapMethodToMode($validated['method']);

            if ($mode && $commande->mode_paiement !== $mode) {
                $commande->update(['mode_paiement' => $mode]);
            }
        }

        $payload = $this->buildInitPayload($commande, $amount, $validated['method'] ?? null);

        try {
            $payment = $this->paymentClient->init($payload);
        } catch (Throwable $e) {
            Log::error('Erreur Moneroo lors de l’initiation du paiement', [
                'commande_id' => $commande->id,
                'payload' => $payload,
                'error' => $e->getMessage(),
            ]);

            return redirect()
                ->route('public.commande.show', $commande->id)
                ->with('error', 'Impossible d’initier le paiement. Veuillez réessayer.');
        }

        $checkoutUrl = $this->extractCheckoutUrl($payment);

        if (!$checkoutUrl) {
            Log::error('Réponse Moneroo sans checkout_url', [
                'commande_id' => $commande->id,
                'payment_response' => $payment,
            ]);

            return redirect()
                ->route('public.commande.show', $commande->id)
                ->with('error', 'La passerelle de paiement n’a pas renvoyé de lien.');
        }

        return redirect()->away($checkoutUrl);
    }

    /**
     * Callback appelé par Moneroo après le paiement.
     */
    public function callback(Request $request)
    {
        $transactionId = $request->input('transaction_id')
            ?? $request->input('transactionId')
            ?? $request->input('monerooPaymentId')
            ?? $request->input('moneroo_payment_id');

        $redirectStatus = $request->input('status')
            ?? $request->input('monerooPaymentStatus')
            ?? $request->input('moneroo_payment_status');

        if (!$transactionId) {
            Log::warning('Retour Moneroo sans transaction_id', ['payload' => $request->all()]);

            return redirect('/')->with('error', 'Transaction de paiement introuvable.');
        }

        try {
            $payment = $this->paymentClient->verify($transactionId);
        } catch (Throwable $e) {
            Log::error('Erreur Moneroo lors de la vérification du paiement', [
                'transaction_id' => $transactionId,
                'error' => $e->getMessage(),
            ]);

            return redirect('/')->with('error', 'Erreur de vérification du paiement.');
        }

        $commandeId = $request->input('commande')
            ?? data_get($payment, 'metadata.commande_id')
            ?? data_get($payment, 'metadata.order_id');

        if (!$commandeId) {
            Log::warning('Paiement Moneroo sans commande associée', [
                'transaction_id' => $transactionId,
                'payment_response' => $payment,
            ]);

            return redirect('/')->with('error', 'Commande associée au paiement introuvable.');
        }

        $commande = Commande::find($commandeId);

        if (!$commande) {
            Log::warning('Commande introuvable lors du callback Moneroo', [
                'commande_id' => $commandeId,
                'transaction_id' => $transactionId,
            ]);

            return redirect('/')->with('error', 'Commande introuvable.');
        }

        $status = strtolower((string) data_get($payment, 'status', $redirectStatus ?? ''));

        if ($status === 'success') {
            $update = [
                'statut' => 'payee',
                'date_paiement' => now(),
            ];

            $mode = $this->mapMethodToMode(
                data_get($payment, 'method') ?? data_get($payment, 'channel')
            );

            if ($mode) {
                $update['mode_paiement'] = $mode;
            }

            $commande->update($update);

            return redirect()
                ->route('public.commande.success', $commande->id)
                ->with('success', 'Paiement confirmé !');
        }

        if ($status === 'pending') {
            return redirect()
                ->route('public.commande.show', $commande->id)
                ->with('info', 'Le paiement est en cours de traitement. Nous vous informerons dès confirmation.');
        }

        Log::warning('Paiement Moneroo non confirmé', [
            'commande_id' => $commande->id,
            'status' => $status,
            'payment_response' => $payment,
        ]);

        return redirect()
            ->route('public.commande.show', $commande->id)
            ->with('error', 'Paiement non complété. Veuillez réessayer ou choisir un autre moyen de paiement.');
    }

    private function buildInitPayload(Commande $commande, int $amount, ?string $method = null): array
    {
        $payload = [
            'amount' => $amount,
            'currency' => config('moneroo.currency', 'XOF'),
            'reference' => $commande->reference,
            'description' => 'Commande ' . $commande->reference,
            'customer' => $this->buildCustomerPayload($commande),
            'metadata' => [
                'commande_id' => (string) $commande->id,
                'reference' => $commande->reference,
                'user_id' => (string) $commande->user_id,
            ],
            'return_url' => $this->buildReturnUrl($commande),
            'callback_url' => $this->buildCallbackUrl($commande),
        ];

        $payload = array_merge($payload, $this->buildRestrictions($commande));

        if ($methods = $this->resolveMethods($method)) {
            $payload['methods'] = $methods;
        }

        return $payload;
    }

    private function buildCustomerPayload(Commande $commande): array
    {
        $user = $this->resolveCommandeUser($commande);

        return array_filter([
            'email' => $commande->email ?? optional($user)->email,
            'first_name' => $commande->prenom ?? optional($user)->prenom,
            'last_name' => $commande->nom ?? optional($user)->nom,
            'phone' => $this->formatPhone($commande->telephone ?? optional($user)->telephone),
            'address' => $commande->adresse ?? optional($user)->adresse,
            'city' => $commande->ville ?? optional($user)->ville,
            'country' => $commande->pays ?? config('moneroo.default_country', 'CI'),
        ]);
    }

    private function buildRestrictions(Commande $commande): array
    {
        $restrictToPhone = (bool) config('moneroo.restrict_customer_phone', false);
        $restrictCountry = config('moneroo.restrict_country_code');

        if ($restrictToPhone) {
            $phone = $this->prepareRestrictedPhoneNumber($commande);

            if ($phone) {
                return [
                    'restricted_phone' => [
                        'number' => $phone,
                        'country_code' => $commande->pays ?? config('moneroo.default_country', 'CI'),
                    ],
                ];
            }
        }

        if ($restrictCountry) {
            return [
                'restrict_country_code' => strtoupper($restrictCountry),
            ];
        }

        return [];
    }

    private function resolveMethods(?string $method): ?array
    {
        if ($method) {
            return [$method];
        }

        $defaults = config('moneroo.default_methods', []);

        return !empty($defaults) ? $defaults : null;
    }

    private function buildReturnUrl(Commande $commande): string
    {
        if ($url = config('moneroo.return_url')) {
            return rtrim($url, '/') . '?commande=' . $commande->id;
        }

        return route('payment.callback', ['commande' => $commande->id]);
    }

    private function buildCallbackUrl(Commande $commande): string
    {
        if ($url = config('moneroo.callback_url')) {
            return rtrim($url, '/') . '?commande=' . $commande->id;
        }

        return route('payment.callback', ['commande' => $commande->id]);
    }

    private function computeAmountInMinorUnit($amount): int
    {
        return (int) round((float) $amount * 100);
    }

    private function extractCheckoutUrl($payment): ?string
    {
        $candidates = [
            'checkout_url',
            'checkoutUrl',
            'data.checkout_url',
            'data.checkoutUrl',
            'url',
            'data.url',
        ];

        foreach ($candidates as $path) {
            $value = data_get($payment, $path);

            if (is_string($value) && filter_var($value, FILTER_VALIDATE_URL)) {
                return $value;
            }
        }

        if (is_string($payment) && filter_var($payment, FILTER_VALIDATE_URL)) {
            return $payment;
        }

        return null;
    }

    private function formatPhone(?string $phone): ?string
    {
        if (!$phone) {
            return null;
        }

        $digits = preg_replace('/\D+/', '', $phone);

        if (!$digits) {
            return null;
        }

        if (str_starts_with($digits, '00')) {
            $digits = substr($digits, 2);
        }

        if (str_starts_with($digits, '0')) {
            return $digits;
        }

        return '+' . ltrim($digits, '+');
    }

    private function prepareRestrictedPhoneNumber(Commande $commande): ?string
    {
        $phone = $commande->telephone;

        if (!$phone) {
            $user = $this->resolveCommandeUser($commande);
            $phone = optional($user)->telephone;
        }

        if (!$phone) {
            return null;
        }

        $digits = preg_replace('/\D+/', '', $phone);

        return $digits ?: null;
    }

    private function resolveCommandeUser(Commande $commande): ?User
    {
        if ($commande->relationLoaded('user')) {
            return $commande->user;
        }

        return $commande->user()->first();
    }

    private function mapMethodToMode(?string $method): ?string
    {
        if (!$method) {
            return null;
        }

        return match (strtolower($method)) {
            'card' => 'card',
            'orange_ci', 'mtn_ci', 'moov_ci', 'wave_ci' => 'mobile_money',
            default => null,
        };
    }
}