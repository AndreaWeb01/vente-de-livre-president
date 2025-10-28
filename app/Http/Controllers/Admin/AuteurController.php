<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Auteur;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

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
                  ->orWhere('nom', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('domaine')) {
            $query->where('domaine', $request->domaine);
        }

        $auteurs = $query->orderBy('created_at', 'desc')->paginate(12);

        return view('admin.auteurs.index', compact('auteurs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::whereDoesntHave('auteur')->get();
        return view('admin.auteurs.create', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'biographie' => 'nullable|string',
        ]);

        // Vérifier que l'utilisateur n'est pas déjà un auteur
        $existingAuteur = Auteur::where('user_id', $request->user_id)->first();
        if ($existingAuteur) {
            return redirect()->back()->withErrors(['user_id' => 'Cet utilisateur est déjà un auteur.']);
        }

        Auteur::create($request->all());

        return redirect()->route('admin.auteurs.index')->with('success', 'Auteur créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $auteur = Auteur::with(['livres', 'user'])->findOrFail($id);
        $roles = \Spatie\Permission\Models\Role::all();
        $permissions = \Spatie\Permission\Models\Permission::all();
        return view('admin.auteurs.show', compact('auteur'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $auteur = Auteur::with('user')->findOrFail($id);
        return view('admin.auteurs.edit', compact('auteur'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $auteur = Auteur::findOrFail($id);

        $request->validate([
            'biographie' => 'nullable|string',
        ]);

        $auteur->update($request->all());

        return redirect()->route('admin.auteurs.index')->with('success', 'Auteur mis à jour avec succès.');
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
        return redirect()->route('admin.auteurs.index')->with('success', 'Auteur supprimé avec succès.');
    }
}
