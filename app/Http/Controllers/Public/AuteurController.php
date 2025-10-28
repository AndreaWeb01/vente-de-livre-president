<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Auteur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuteurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Auteur::with(['livres', 'user']);

        // Filtres
        if ($request->filled('search')) {
            $query->whereHas('user', function($q) use ($request) {
                $q->where('prenom', 'like', '%' . $request->search . '%')
                  ->orWhere('nom', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('domaine')) {
            $query->where('domaine', $request->domaine);
        }

        $auteurs = $query->orderBy('created_at', 'desc')->paginate(12);

        return Inertia::render('Auteur', [
            'auteurs' => $auteurs,
            'filters' => $request->only(['search', 'domaine'])
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $auteur = Auteur::with(['livres', 'user'])->findOrFail($id);
        
        return Inertia::render('AuteurDetail', [
            'auteur' => $auteur
        ]);
    }
}
