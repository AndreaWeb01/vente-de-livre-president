<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    /**
     * Afficher la liste des commandes
     */
    public function index(Request $request)
    {
        $query = Commande::with(['user', 'achats.achetable']);

        // Filtres
        if ($request->filled('search')) {
            $query->where('reference', 'like', '%' . $request->search . '%')
                  ->orWhereHas('user', function($q) use ($request) {
                      $q->where('prenom', 'like', '%' . $request->search . '%')
                        ->orWhere('nom', 'like', '%' . $request->search . '%')
                        ->orWhere('email', 'like', '%' . $request->search . '%');
                  });
        }

        if ($request->filled('statut')) {
            $query->where('statut', $request->statut);
        }

        if ($request->filled('mode_paiement')) {
            $query->where('mode_paiement', $request->mode_paiement);
        }

        $commandes = $query->orderBy('created_at', 'desc')->paginate(20);

        return view('admin.commandes.index', compact('commandes'));
    }

    /**
     * Afficher les détails d'une commande
     */
    public function show($id)
    {
        $commande = Commande::with(['user', 'achats.achetable'])
            ->findOrFail($id);

        return view('admin.commandes.show', compact('commande'));
    }

    /**
     * Mettre à jour le statut d'une commande
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'statut' => 'required|in:en_attente,payee,annulee'
        ]);

        $commande = Commande::findOrFail($id);
        $commande->update([
            'statut' => $request->statut,
            'date_paiement' => $request->statut === 'payee' ? now() : null
        ]);

        return redirect()->back()->with('success', 'Statut de la commande mis à jour !');
    }
}
