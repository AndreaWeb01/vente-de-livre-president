<?php

namespace App\Http\Controllers;
use App\Models\Livre;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use Inertia\Inertia;

use Illuminate\Http\Request;

class livreController extends Controller
{

    public function index()
    {
        $livres = Livre::with('auteur')->get();
        return Inertia::render('livres/index', compact('livres'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $auteurs = \App\Models\Auteur::with('user')->get();
        return Inertia::render('livres/create', compact('auteurs'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'auteur_id' => 'required|exists:auteurs,id',
            'description' => 'required|string',
            'page' => 'required|integer|min:1',
            'type' => 'required|string|max:100',
            'langue' => 'required|string|max:50',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'livrepdf' => 'nullable|file|mimes:pdf|max:10240',
            'date_publication' => 'required|date',
            'prix' => 'required|numeric|min:0|max:999999.99',
            'stock' => 'required|integer|min:0',
            'est_actif' => 'boolean',
        ]);

        $data = $request->all();

        // Upload de l'image
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('livres/photos', 'public');
            $data['photo'] = $photoPath;
        }

        // Upload du PDF
        if ($request->hasFile('livrepdf')) {
            $pdfPath = $request->file('livrepdf')->store('livres/pdfs', 'public');
            $data['livrepdf'] = $pdfPath;
        }

        Livre::create($data);
        return redirect()->route('livres.index')->with('success', 'Livre créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $livre = Livre::with('auteur.user')->findOrFail($id);
        return Inertia::render('livres/show', compact('livre'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $livre = Livre::with('auteur.user')->findOrFail($id);
        $auteurs = \App\Models\Auteur::with('user')->get();
        return Inertia::render('livres/edit', compact('livre', 'auteurs'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $livre = Livre::findOrFail($id);

        // Validation des champs obligatoires
        $request->validate([
            'titre' => 'required|string|max:255',
            'auteur_id' => 'required|exists:auteurs,id',
            'description' => 'required|string',
            'page' => 'required|integer|min:1',
            'type' => 'required|string|max:100',
            'langue' => 'required|string|max:50',
            'date_publication' => 'required|date',
            'prix' => 'required|numeric|min:0|max:999999.99',
            'stock' => 'required|integer|min:0',
            'est_actif' => 'boolean',
        ]);

        // Validation des fichiers seulement s'ils sont fournis
        if ($request->hasFile('photo')) {
            $request->validate([
                'photo' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
        }

        if ($request->hasFile('livrepdf')) {
            $request->validate([
                'livrepdf' => 'file|mimes:pdf|max:10240',
            ]);
        }

        $data = $request->only([
            'titre', 'auteur_id', 'description', 'page', 'type',
            'langue', 'date_publication', 'prix', 'stock', 'est_actif'
        ]);

        // Upload de la nouvelle image si fournie
        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne image
            if ($livre->photo && Storage::disk('public')->exists($livre->photo)) {
                Storage::disk('public')->delete($livre->photo);
            }
            $photoPath = $request->file('photo')->store('livres/photos', 'public');
            $data['photo'] = $photoPath;
        }

        // Upload du nouveau PDF si fourni
        if ($request->hasFile('livrepdf')) {
            // Supprimer l'ancien PDF
            if ($livre->livrepdf && Storage::disk('public')->exists($livre->livrepdf)) {
                Storage::disk('public')->delete($livre->livrepdf);
            }
            $pdfPath = $request->file('livrepdf')->store('livres/pdfs', 'public');
            $data['livrepdf'] = $pdfPath;
        }

        $livre->update($data);
        return redirect()->route('livres.index')->with('success', 'Livre mis à jour avec succès.');
    }


    public function destroy(string $id)
    {
        $livre = Livre::findOrFail($id);
        $livre->delete();
        return redirect()->route('livres.index')->with('success', 'Livre supprimé avec succès.');
    }
}
