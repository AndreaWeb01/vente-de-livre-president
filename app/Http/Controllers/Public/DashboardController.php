<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Panier;
use App\Models\Commande;
use App\Models\Achat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;



class DashboardController extends Controller
{
    /**
     * Afficher le dashboard utilisateur
     */
    public function index()
    {
        $user = Auth::user();
        $webinaires = $user->formationsAchetees()
        ->where('type', 'webinaire')
        ->where('est_actif', true)
        ->orderBy('created_at', 'desc')
        ->get();

        $formations = $user->formationsAchetees()
        ->with(['user'])
        ->where('est_actif', true)
        ->orderBy('created_at', 'desc')
        ->get();

        $livres = $user->livresAchetes()
        ->with(['auteur.user'])
        ->where('est_actif', true)
        ->orderBy('created_at', 'desc')
        ->get();
        $webinaires = $user->formationsAchetees()
            ->where('type', 'webinaire')
            ->where('est_actif', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/Dashboard', [
            'user' => $user,
            'stats' => [
                'panier_count' => $user->panier->count(),
                'panier_total' => $user->panier->sum('prix_total'),
                'commandes_count' => $user->commandes->count(),
                'achats_count' => $user->achats->count(),
                'formation_count'=>$formations->count(),
                "livre_count"=>$user->livresAchetes->count(),
                "webinaires_count()"=>$webinaires->count()
            ],
            'formations'=>$formations,
            'livres'=>$livres,
            'webinaires'=>$webinaires,
            'dernieres_commandes' => $user->commandes()->latest()->take(5)->get(),
            'derniers_achats' => $user->achats()->latest()->take(5)->get(),
        ]);
    }
}
