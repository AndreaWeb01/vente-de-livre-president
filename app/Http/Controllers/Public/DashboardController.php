<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Panier;
use App\Models\Commande;
use App\Models\Achat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Afficher le dashboard utilisateur
     */
    public function index()
    {
        $user = Auth::user();

        return view('public.dashboard-simple', [
            'user' => $user,
            'stats' => [
                'panier_count' => 0,
                'panier_total' => 0,
                'commandes_count' => 0,
                'commandes_total' => 0,
                'achats_count' => 0,
            ],
            'dernieres_commandes' => collect(),
            'derniers_achats' => collect(),
        ]);
    }
}
