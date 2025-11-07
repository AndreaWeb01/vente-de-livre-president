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

        $user = Auth::user();

        return Inertia::render('public/commande/create', [
            'panier' => $panier,
            'total' => $total,
            'user' => [
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'email' => $user->email,
                'telephone' => $user->telephone,
                'adresse' => $user->adresse,
                'ville' => $user->ville,
                'quartier' => $user->quartier,
            ],
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
    
        $panier = Panier::with(['achetable'])
            ->where('user_id', Auth::id())
            ->get();
    
        if ($panier->isEmpty()) {
            return redirect()->route('public.panier.index')
                ->with('error', 'Votre panier est vide !');
        }
    
        $total = $panier->sum('prix_total');
    
        try {
            DB::beginTransaction();
    
            $user = Auth::user();
    
            // Générer une référence unique
            $reference = 'CMD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -8));

            $modePaiement = $request->input('mode_paiement');
            $notes = $request->input('notes');

            // Créer la commande avec les infos du formulaire
            $commande = Commande::create([
                'user_id' => $user->id,
                'nom' => $request->input('nom', $user->nom),
                'prenom' => $request->input('prenom', $user->prenom),
                'email' => $request->input('email', $user->email),
                'telephone' => preg_replace('/\D+/', '', $request->input('telephone', $user->telephone)),
                'adresse' => $request->input('adresse', $user->adresse),
                'ville' => $request->input('ville', $user->ville),
                'quartier' => $request->input('quartier', $user->quartier),
                'total' => $total,
                'statut' => 'en_attente',
                'reference' => $reference,
                'mode_paiement' => $modePaiement,
                'notes' => $notes,
            ]);
    
            // Créer les achats et décrémenter le stock
            foreach ($panier as $item) {
                Achat::create([
                    'user_id' => $user->id,
                    'commande_id' => $commande->id,
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
    
            return redirect()
                ->route('public.commande.success', $commande->id)
                ->with('success', 'Commande passée avec succès !');
    
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Erreur: '.$e->getMessage());
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

        return Inertia::render('dashboard/Commande', [
            'commandes' => $commandes,
        ]);
    }
}
