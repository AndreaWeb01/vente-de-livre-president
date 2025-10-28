<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Panier;
use App\Models\Commande;
use App\Models\Achat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CommandeController extends Controller
{
    /**
     * Afficher le formulaire de commande
     */
    public function create()
    {
        $panier = Panier::with(['achetable'])
            ->where('user_id', Auth::id())
            ->get();

        if ($panier->isEmpty()) {
            return redirect()->route('public.panier.index')->with('error', 'Votre panier est vide !');
        }

        $total = $panier->sum('prix_total');

        return Inertia::render('public/commande/create', [
            'panier' => $panier,
            'total' => $total,
        ]);
    }

    /**
     * Traiter la commande
     */
    public function store(Request $request)
    {
        $request->validate([
            'mode_paiement' => 'required|string|in:mobile_money,card,cash',
            'notes' => 'nullable|string|max:500',
        ]);

        $panier = Panier::with(['achetable'])
            ->where('user_id', Auth::id())
            ->get();

        if ($panier->isEmpty()) {
            return redirect()->route('public.panier.index')->with('error', 'Votre panier est vide !');
        }

        $total = $panier->sum('prix_total');

        try {
            DB::beginTransaction();

            // Générer une référence unique
            $reference = 'CMD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -8));

            // Créer la commande
            $commande = Commande::create([
                'user_id' => Auth::id(),
                'total' => $total,
                'statut' => 'en_attente',
                'reference' => $reference,
                'mode_paiement' => $request->input('mode_paiement'),
                'notes' => $request->input('notes'),
            ]);

            // Créer les achats et vider le panier
            foreach ($panier as $item) {
                Achat::create([
                    'user_id' => Auth::id(),
                    'commande_id' => $commande->id,
                    'achetable_type' => $item->achetable_type,
                    'achetable_id' => $item->achetable_id,
                    'prix' => $item->prix_total,
                ]);

                // Décrémenter le stock pour les livres
                if ($item->achetable_type === 'App\Models\Livre') {
                    $livre = $item->achetable;
                    $livre->decrement('stock', $item->quantite);
                }
            }

            // Vider le panier
            $panier->each->delete();

            DB::commit();

            return redirect()->route('public.commande.success', $commande->id)
                ->with('success', 'Commande passée avec succès !');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->with('error', 'Une erreur est survenue lors de la commande. Veuillez réessayer.');
        }
    }

    /**
     * Afficher la page de succès de commande
     */
    public function success($id)
    {
        $commande = Commande::with(['achats.achetable'])
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return Inertia::render('public/commande/success', [
            'commande' => $commande,
        ]);
    }

    /**
     * Afficher les détails d'une commande
     */
    public function show($id)
    {
        $commande = Commande::with(['achats.achetable'])
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return Inertia::render('public/commande/show', [
            'commande' => $commande,
        ]);
    }

    /**
     * Lister les commandes de l'utilisateur
     */
    public function index()
    {
        $commandes = Commande::with(['achats.achetable'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('public/commande/index', [
            'commandes' => $commandes,
        ]);
    }
}
