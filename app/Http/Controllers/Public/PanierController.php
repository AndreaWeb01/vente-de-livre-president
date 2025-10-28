<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Panier;
use App\Models\Livre;
use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PanierController extends Controller
{
    /**
     * Afficher le panier de l'utilisateur
     */
    public function index()
    {
        $panier = Panier::with(['achetable'])
            ->where('user_id', Auth::id())
            ->get();

        $total = $panier->sum('prix_total');

        return Inertia::render('public/panier/index', [
            'panier' => $panier,
            'total' => $total,
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
        $panierItem = Panier::where('user_id', Auth::id())
            ->where('achetable_type', Livre::class)
            ->where('achetable_id', $id)
            ->first();

        if ($panierItem) {
            // Mettre à jour la quantité
            $panierItem->quantite += $quantite;
            $panierItem->save();
        } else {
            // Créer un nouvel élément
            Panier::create([
                'user_id' => Auth::id(),
                'achetable_type' => Livre::class,
                'achetable_id' => $id,
                'quantite' => $quantite,
                'prix_unitaire' => $livre->prix,
            ]);
        }

        return redirect()->back()->with('success', 'Livre ajouté au panier !');
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
        $panierItem = Panier::where('user_id', Auth::id())
            ->where('achetable_type', Formation::class)
            ->where('achetable_id', $id)
            ->first();

        if ($panierItem) {
            return redirect()->back()->with('error', 'Cette formation est déjà dans votre panier !');
        } else {
            // Créer un nouvel élément
            Panier::create([
                'user_id' => Auth::id(),
                'achetable_type' => Formation::class,
                'achetable_id' => $id,
                'quantite' => $quantite,
                'prix_unitaire' => $formation->prix,
            ]);
        }

        return Inertia::render('public/panier/index');
    }

    /**
     * Mettre à jour la quantité d'un élément du panier
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantite' => 'required|integer|min:1|max:10',
        ]);

        $panierItem = Panier::where('id', $id)
            ->where('user_id', Auth::id())
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
        $panierItem = Panier::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $panierItem->delete();

        return redirect()->back()->with('success', 'Élément supprimé du panier !');
    }

    /**
     * Vider le panier
     */
    public function clear()
    {
        Panier::where('user_id', Auth::id())->delete();

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
        $panierItem = Panier::where('user_id', Auth::id())
            ->where('achetable_type', Livre::class)
            ->where('achetable_id', $id)
            ->first();

        if ($panierItem) {
            // Mettre à jour la quantité
            $panierItem->quantite += $quantite;
            $panierItem->save();
        } else {
            // Créer un nouvel élément
            Panier::create([
                'user_id' => Auth::id(),
                'achetable_type' => Livre::class,
                'achetable_id' => $id,
                'quantite' => $quantite,
                'prix_unitaire' => $livre->prix,
            ]);
        }

        return redirect()->route('public.commande.create')->with('success', 'Livre ajouté au panier ! Vous pouvez maintenant finaliser votre commande.');
    }

    /**
     * Achat direct d'une formation (ajouter au panier et rediriger vers commande)
     */
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
        $panierItem = Panier::where('user_id', Auth::id())
            ->where('achetable_type', Formation::class)
            ->where('achetable_id', $id)
            ->first();

        if ($panierItem) {
            return redirect()->route('public.commande.create')->with('info', 'Cette formation est déjà dans votre panier !');
        } else {
            // Créer un nouvel élément
            Panier::create([
                'user_id' => Auth::id(),
                'achetable_type' => Formation::class,
                'achetable_id' => $id,
                'quantite' => $quantite,
                'prix_unitaire' => $formation->prix,
            ]);
        }

        return redirect()->route('public.commande.create')->with('success', 'Formation ajoutée au panier ! Vous pouvez maintenant finaliser votre commande.');
    }
}
