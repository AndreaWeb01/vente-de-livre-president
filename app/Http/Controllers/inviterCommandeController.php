<?php

namespace App\Http\Controllers;
use App\Models\achatinviter;
use App\Models\Commandeinviter;
use App\Models\Panierinviter;
use App\Models\Livre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class inviterCommandeController extends Controller
{
    /**
     * Afficher le formulaire de commande
     */
    public function create()
    {
        $panier = Panierinviter::with(['achetable'])->get();

        if ($panier->isEmpty()) {
            return redirect()->route('public.panier.index')->with('error', 'Votre panier est vide !');
        }

        $total = $panier->sum('prix_total');

        return Inertia::render('PanierProduitNumerique', [
            'panier' => $panier,
            'total' => $total,
            'user' => [
                'nom' => '',
                'prenom' => '',
                'email' => '',
                'telephone' => '',
                'adresse' => '',
                'ville' => '',
                'quartier' => '',
            ],
        ]);
    }

    /**
     * Traiter la commande
     */
    public function store(Request $request)
    {
        $request->validate([
            'mode_paiement' => 'required|string|in:mobile_money,carte_credit,espece',
            'moneroo_method' => [
                'nullable',
                Rule::requiredIf(fn () => $request->input('mode_paiement') === 'mobile_money'),
                Rule::in(['orange_ci', 'mtn_ci', 'wave_ci', 'moov_ci']),
            ],
            'notes' => 'nullable|string|max:500',
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            // Autorise le + et les chiffres (8 à 15 caractères)
            'telephone' => ['required', 'regex:/^\+?\d{8,15}$/'],
            'pays' => 'nullable|string|max:255',
            'adresse' => 'nullable|string|max:255',
            'ville' => 'nullable|string|max:255',
            'quartier' => 'nullable|string|max:255',
        ]);
    
        $panier = Panierinviter::with(['achetable'])->get();
    
        if ($panier->isEmpty()) {
            return redirect()->route('public.panier.index')
                ->with('error', 'Votre panier est vide !');
        }
    
        $total = $panier->sum('prix_total');
    
        try {
            DB::beginTransaction();
    
            // Générer une référence unique
            $reference = 'CMD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -8));

            $modePaiement = $request->input('mode_paiement');
            $notes = $request->input('notes');

            // Créer la commande avec les infos du formulaire
            $commande = Commandeinviter::create([
                'nom' => $request->input('nom'),
                'prenom' => $request->input('prenom'),
                'email' => $request->input('email'),
                'telephone' => preg_replace('/\D+/', '', $request->input('telephone')),
                'adresse' => $request->input('adresse'),
                'ville' => $request->input('ville'),
                'quartier' => $request->input('quartier'),
                'pays' => $request->input('pays', 'CI'),
                'total' => $total,
                'statut' => 'en_attente',
                'reference' => $reference,
                'mode_paiement' => $modePaiement,
                'notes' => $notes,
            ]);
    
            // Créer les achats et décrémenter le stock
            foreach ($panier as $item) {
                achatinviter::create([
                    'commandeinviter_id' => $commande->id,
                    'achetable_type' => $item->achetable_type,
                    'achetable_id' => $item->achetable_id,
                    'prix' => $item->prix_total,
                ]);   
    
                // Vérifier et décrémenter le stock pour les livres
                if ($item->achetable_type === 'App\\Models\\Livre') {
                    $livre = $item->achetable;
                    if ($livre && $livre->stock >= $item->quantite) {
                        $livre->decrement('stock', $item->quantite);
                    } else {
                        throw new \Exception("Stock insuffisant pour le livre : {$livre->titre}");
                    }
                }
            }
    
            // Vider le panier après succès
            $panier->each->delete();
    
            DB::commit();

            return redirect()->route('commande.success', $commande->id)
                ->with('success', 'Commande invitée passée avec succès !');
    
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Erreur: '.$e->getMessage());
        }
        
    }

    public function success($id)
    {
        $commande = Commandeinviter::with(['achats.achetable'])
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
        $commande = Commandeinviter::with(['achats.achetable'])
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
        $commandes = Commandeinviter::with(['achats.achetable'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('dashboard/Commande', [
            'commandes' => $commandes,
        ]);
    }
}

