<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Livre;
use App\Models\Panierinviter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class panierCommandeController extends Controller
{
    public function index()
    {
        $panier = Panierinviter::with(['achetable'])
            ->get();

        $total = $panier->sum('prix_total');

        $user = Auth::user();

        return Inertia::render('public/commande/create', [
            'panier' => $panier,
            'total' => $total,
            'user' => [
                'nom' => $user->nom ?? '',
                'prenom' => $user->prenom ?? '',
                'email' => $user->email ?? '',
                'telephone' => $user->telephone ?? '',
                'adresse' => $user->adresse ?? '',
                'ville' => $user->ville ?? '',
                'quartier' => $user->quartier ?? '',    
            ],
        ]);
    }

    /**
     * Ajouter un livre au panier
     */
   public function addLivre(Request $request, $id)
    {
        $request->validate([
            'quantite' => 'integer|min:1|max:10',
        ]);

        $livre = Livre::where('id', $id)
            ->where('est_actif', true)
            ->where('stock', '>', 0)
            ->firstOrFail();

        $quantite = $request->input('quantite', 1);

        // Vérifier si l'élément existe déjà dans le panier
        $panierItem = Panierinviter::
            where('achetable_type', Livre::class)
            ->where('achetable_id', $id)
            ->first();

        if ($panierItem) {
            // Mettre à jour la quantité
            $panierItem->quantite += $quantite;
            $panierItem->save();
        } else {
            // Créer un nouvel élément
            Panierinviter::create([
                'achetable_type' => Livre::class,
                'achetable_id' => $id,
                'quantite' => $quantite,
                'prix_unitaire' => $livre->prix,
            ]);
        }
        return redirect()->route('public.panier.index-pysique.livre')->with('success', 'Livre ajouté au panier !');
    }


    /**
     * Ajouter une formation au panier
     */
  public function addFormation(Request $request, $id)
    {
        $request->validate([
            'quantite' => 'integer|min:1|max:1', // Les formations sont généralement limitées à 1
        ]);

        $formation = Formation::where('id', $id)
            ->where('est_actif', true)
            ->firstOrFail();

        $quantite = $request->input('quantite', 1);

        // Vérifier si l'élément existe déjà dans le panier
        $panierItem = Panierinviter::where('achetable_type', Formation::class)
            ->where('achetable_id', $id)
            ->first();

        if ($panierItem) {
            return redirect()->back()->with('error', 'Cette formation est déjà dans votre panier !');
        } else {
            // Créer un nouvel élément
            Panierinviter::create([
                'achetable_type' => Formation::class,
                'achetable_id' => $id,
                'quantite' => $quantite,
                'prix_unitaire' => $formation->prix,
            ]);
        }

        return redirect()->route('public.panier.index')->with('success', 'Formation ajoutée au panier !');
    }

    /**
     * Mettre à jour la quantité d'un élément du panier
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantite' => 'required|integer|min:1|max:10',
        ]);

        $panierItem = Panierinviter::where('id', $id)
            ->firstOrFail();

        $panierItem->quantite = $request->input('quantite');
        $panierItem->save();

        return redirect()->back()->with('success', 'Quantité mise à jour !');
    }

    /**
     * Supprimer un élément du panier
     */
    public function destroy($id)
    {
        $panierItem = Panierinviter::where('id', $id)
            ->firstOrFail();

        $panierItem->delete();

        return redirect()->back()->with('success', 'Élément supprimé du panier !');
    }

    /**
     * Vider le panier
     */
    public function clear()
    {
        Panierinviter::
            where('achetable_type', Livre::class)
            ->delete();

        return redirect()->back()->with('success', 'Panier vidé !');
    }

    /**
     * Achat direct d'un livre (ajouter au panier et rediriger vers commande)
     */
    public function buyLivreDirect(Request $request, $id)
    {
        $request->validate([
            'quantite' => 'integer|min:1|max:10',
        ]);

        $livre = Livre::where('id', $id)
            ->where('est_actif', true)
            ->where('stock', '>', 0)
            ->firstOrFail();

        $quantite = $request->input('quantite', 1);

        // Vérifier si l'élément existe déjà dans le panier
        $panierItem = Panierinviter::
            where('achetable_type', Livre::class)
            ->where('achetable_id', $id)
            ->first();

        if ($panierItem) {
            // Mettre à jour la quantité
            $panierItem->quantite += $quantite;
            $panierItem->save();
        } else {
            // Créer un nouvel élément
            Panierinviter::create([
                'achetable_type' => Livre::class,
                'achetable_id' => $id,
                'quantite' => $quantite,
                'prix_unitaire' => $livre->prix,
            ]);
        }

        return Inertia::render('PanierProduitNumerique', [
            'success' => 'Livre ajouté au panier ! Vous pouvez maintenant finaliser votre commande.',
        ]);
    }


    public function buyFormationDirect(Request $request, $id)
    {
        $request->validate([
            'quantite' => 'integer|min:1|max:1',
        ]);

        $formation = Formation::where('id', $id)
            ->where('est_actif', true)
            ->firstOrFail();

        $quantite = $request->input('quantite', 1);

        // Vérifier si l'élément existe déjà dans le panier
        $panierItem = Panierinviter::
            where('achetable_type', Formation::class)
            ->where('achetable_id', $id)
            ->first();

        if ($panierItem) {
            return Inertia::render('PanierProduitNumerique', [
                'info' => 'Cette formation est déjà dans votre panier !',
            ]);
        } else {
            // Créer un nouvel élément
            Panierinviter::create([
                'achetable_type' => Formation::class,
                'achetable_id' => $id,
                'quantite' => $quantite,
                'prix_unitaire' => $formation->prix,
            ]);
        }

        return Inertia::render('PanierProduitNumerique', [
            'success' => 'Formation ajoutée au panier ! Vous pouvez maintenant finaliser votre commande.',
        ]);
    }
}
