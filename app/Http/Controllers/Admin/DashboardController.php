<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Formation;
use App\Models\Livre;
use App\Models\Commande;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Afficher le dashboard d'administration
     */
    public function index()
    {
        // Statistiques principales
        $totalUsers = User::count();
        $totalFormations = Formation::count();
        $totalLivres = Livre::count();
        $totalOrders = Commande::count();

        // Revenus
        $totalRevenue = Commande::where('statut', 'payee')->sum('total');
        $monthlyRevenue = Commande::where('statut', 'payee')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total');

        // Commandes par statut
        $ordersByStatus = [
            'en_attente' => Commande::where('statut', 'en_attente')->count(),
            'payee' => Commande::where('statut', 'payee')->count(),
            'annulee' => Commande::where('statut', 'annulee')->count(),
        ];

        // Commandes récentes
        $recentOrders = Commande::with(['user', 'achats.achetable'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($commande) {
                return [
                    'id' => $commande->id,
                    'reference' => $commande->reference,
                    'user_name' => $commande->user->prenom . ' ' . $commande->user->nom,
                    'total' => $commande->total,
                    'statut' => $commande->statut,
                    'mode_paiement' => $commande->mode_paiement,
                    'created_at' => $commande->created_at->format('d/m/Y H:i'),
                    'items_count' => $commande->achats->count(),
                ];
            });

        // Formations récentes
        $recentFormations = Formation::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($formation) {
                return [
                    'id' => $formation->id,
                    'titre' => $formation->titre,
                    'prix' => $formation->prix,
                    'est_actif' => $formation->est_actif,
                    'formateur' => $formation->formateur,
                    'created_at' => $formation->created_at->format('d/m/Y'),
                ];
            });

        // Livres récents
        $recentLivres = Livre::with('auteur.user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($livre) {
                return [
                    'id' => $livre->id,
                    'titre' => $livre->titre,
                    'prix' => $livre->prix,
                    'stock' => $livre->stock,
                    'auteur' => $livre->auteur->user->prenom . ' ' . $livre->auteur->user->nom,
                    'created_at' => $livre->created_at->format('d/m/Y'),
                ];
            });

        // Statistiques des 7 derniers jours
        $last7Days = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $last7Days[] = [
                'date' => $date->format('d/m'),
                'commandes' => Commande::whereDate('created_at', $date)->count(),
                'revenus' => Commande::where('statut', 'payee')
                    ->whereDate('created_at', $date)
                    ->sum('total'),
            ];
        }

        $stats = [
            'totalUsers' => $totalUsers,
            'totalFormations' => $totalFormations,
            'totalLivres' => $totalLivres,
            'totalOrders' => $totalOrders,
            'totalRevenue' => $totalRevenue,
            'monthlyRevenue' => $monthlyRevenue,
            'ordersByStatus' => $ordersByStatus,
            'recentOrders' => $recentOrders,
            'recentFormations' => $recentFormations,
            'recentLivres' => $recentLivres,
            'last7Days' => $last7Days,
        ];

        return view('admin.dashboard', [
            'stats' => $stats
        ]);
    }
}
