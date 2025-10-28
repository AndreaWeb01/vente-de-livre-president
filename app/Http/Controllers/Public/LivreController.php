<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Livre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LivreController extends Controller
{
    public function index()
{
    $livresPhysiques = Livre::where('type', 'physique')->get();
    $livresNumeriques = Livre::where('type', 'numerique')->get();

    return Inertia::render('Livres', [
        'livresPhysiques' => $livresPhysiques,
        'livresNumeriques' => $livresNumeriques,
    ]);
}

    /**
     * Afficher la liste des livres publics
     */
   
    /**
     * Afficher les détails d'un livre
     */
    public function show(Livre $livre)
    {
        if (!$livre->est_actif) {
            abort(404);
        }

        $livre->load('auteur.user');

        return Inertia::render('Livres', compact('livre'));
    }
}
