<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Livre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccessController extends Controller
{
    /**
     * Afficher les formations achetées par l'utilisateur connecté
     */
    public function mesFormations()
    {
        $user = auth()->user();

        $formations = $user->formationsAchetees()
            ->with(['user'])
            ->where('est_actif', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Formations/MesFormations', [
            'formations' => $formations
        ]);
    }

    /**
     * Afficher les livres achetés par l'utilisateur connecté
     */
    public function mesLivres()
    {
        $user = auth()->user();

        $livres = $user->livresAchetes()
            ->with(['auteur.user'])
            ->where('est_actif', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Livres/MesLivres', [
            'livres' => $livres
        ]);
    }

    /**
     * Afficher une formation achetée (avec middleware de contrôle d'accès)
     */
    public function voirFormation($id)
    {
        $formation = Formation::with(['user'])
            ->where('id', $id)
            ->where('est_actif', true)
            ->firstOrFail();

        return Inertia::render('Formations/Show', [
            'formation' => $formation
        ]);
    }

    /**
     * Afficher un livre acheté (avec middleware de contrôle d'accès)
     */
    public function voirLivre($id)
    {
        $livre = Livre::with(['auteur.user'])
            ->where('id', $id)
            ->where('est_actif', true)
            ->firstOrFail();

        return Inertia::render('Livres/Show', [
            'livre' => $livre
        ]);
    }
}
