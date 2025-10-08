<?php

namespace App\Http\Controllers;

use App\Models\Auteur;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use App\Models\User;

class AuteurController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $auteurs = Auteur::with(['livres', 'user'])->get();
        return Inertia::render('auteurs/index', compact('auteurs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::whereDoesntHave('auteur')->get();
        return Inertia::render('auteurs/create', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'biographie' => 'required|string|max:1000',
        ]);

        // Vérifier que l'utilisateur n'est pas déjà un auteur
        $existingAuteur = Auteur::where('user_id', $request->user_id)->first();
        if ($existingAuteur) {
            return redirect()->back()->withErrors(['user_id' => 'Cet utilisateur est déjà un auteur.']);
        }

        Auteur::create($request->all());

        return redirect()->route('auteurs.index')->with('success', 'Auteur créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $auteur = Auteur::with(['livres', 'user'])->findOrFail($id);
        $roles = \Spatie\Permission\Models\Role::all();
        $permissions = \Spatie\Permission\Models\Permission::all();
        return Inertia::render('auteurs/show', compact('auteur', 'roles', 'permissions'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $auteur = Auteur::with('user')->findOrFail($id);
        return Inertia::render('auteurs/edit', compact('auteur'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $auteur = Auteur::findOrFail($id);

        $request->validate([
            'biographie' => 'required|string|max:1000',
        ]);

        $auteur->update($request->all());

        return redirect()->route('auteurs.index')->with('success', 'Auteur mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $auteur = Auteur::findOrFail($id);

        // Vérifier s'il y a des livres associés
        if ($auteur->livres()->count() > 0) {
            return redirect()->route('auteurs.index')->with('error', 'Impossible de supprimer cet auteur car il a des livres associés.');
        }

        $auteur->delete();
        return redirect()->route('auteurs.index')->with('success', 'Auteur supprimé avec succès.');
    }
}
