<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormationController extends Controller
{
    /**
     * Afficher la liste des formations publiques
     */
    public function index(Request $request)
    {
        $query = Formation::where('est_actif', true);

        // Filtrage par type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Recherche par titre
        if ($request->filled('search')) {
            $query->where('titre', 'like', '%' . $request->search . '%');
        }

        $formations = $query->paginate(12);

        return Inertia::render('Formations', compact('formations'));
    }

    /**
     * Afficher les détails d'une formation
     */
    public function show(Formation $formation)
    {
        if (!$formation->est_actif) {
            abort(404);
        }

        return Inertia::render('Formations', compact('formation'));
    }
}
