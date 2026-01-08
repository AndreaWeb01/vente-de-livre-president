<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Livre;
use App\Models\Formation as Webinaire;
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
            ->where('type', 'en_ligne')
            ->where('est_actif', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/Formations', [
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

        return Inertia::render('dashboard/Livre', [
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
            ->where('type', 'en_ligne')
            ->where('est_actif', true)
            ->firstOrFail();

        return Inertia::render('dashboard/ShowFormation', [
            'formation' => $formation,
            'player' => route('video.stream', $formation->id),
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
       
        return Inertia::render('dashboard/ReadBook', [
            'livre' => $livre,
            
        ]);
    }

    /**
     * Lire la vidéo d'une formation achetée (page lecteur)
     */
    public function voirVideoFormation($id)
    {
        $formation = Formation::with(['user'])
            ->where('id', $id)
            ->where('type', 'en_ligne')
            ->where('est_actif', true)
            ->firstOrFail();

        return Inertia::render('dashboard/FormPlayerVideo', [
            'formation' => $formation,
            'player' => $formation->url_video,
        ]);
    }

    /**
     * Afficher les webinaires (formations de type webinaire) achetés par l'utilisateur
     */
    public function mesWebinaire()
    {
        $user = auth()->user();
        $webinaires = $user->formationsAchetees()
            ->where('type', 'webinaire')
            ->where('est_actif', true)
            ->withCount('achats')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/Webinaires', [
            'webinaires' =>$webinaires,
            
        ]);
    }
}
