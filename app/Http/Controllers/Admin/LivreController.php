<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Livre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Auteur;

class LivreController extends Controller
{

    public function index(Request $request)
    {
        $query = Livre::with('auteur.user');

        // Filtres
        if ($request->filled('search')) {
            $query->where('titre', 'like', '%' . $request->search . '%')
                  ->orWhereHas('auteur.user', function($q) use ($request) {
                      $q->where('prenom', 'like', '%' . $request->search . '%')
                        ->orWhere('nom', 'like', '%' . $request->search . '%');
                  });
        }

        if ($request->filled('auteur')) {
            $query->where('auteur_id', $request->auteur);
        }

        $livres = $query->orderBy('created_at', 'desc')->paginate(12);
        $auteurs = Auteur::with('user')->get();

        return view('admin.livres.index', compact('livres', 'auteurs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $auteurs = \App\Models\Auteur::with('user')->get();
        return view('admin.livres.create', compact('auteurs'));
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
            'photo' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
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
            try {
                $pdfPath = $request->file('livrepdf')->store('livres/pdfs', 'public');
                $data['livrepdf'] = $pdfPath;
            } catch (\Exception $e) {
                return redirect()->back()->withErrors(['livrepdf' => 'Erreur lors de l\'upload du PDF : ' . $e->getMessage()])->withInput();
            }
        }

        try {
            Livre::create($data);
            return redirect()->route('admin.livres.index')->with('success', 'Livre créé avec succès.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erreur lors de la création : ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $livre = Livre::with('auteur.user')->findOrFail($id);
        return view('admin.livres.show', compact('livre'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $livre = Livre::with('auteur.user')->findOrFail($id);
        $auteurs = \App\Models\Auteur::with('user')->get();
        return view('admin.livres.edit', compact('livre', 'auteurs'));
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

        return redirect()->route('admin.livres.index')->with('success', 'Livre mis à jour avec succès.');
    }


    public function destroy(string $id)
    {
        $livre = Livre::findOrFail($id);
        $livre->delete();
        return redirect()->route('admin.livres.index')->with('success', 'Livre supprimé avec succès.');
    }
}
