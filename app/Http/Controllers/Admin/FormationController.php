<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FormationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Formation::with('user');

        // Filtres
        if ($request->filled('search')) {
            $query->where('titre', 'like', '%' . $request->search . '%')
                  ->orWhere('formateur', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $formations = $query->orderBy('created_at', 'desc')->paginate(12);

        return view('admin.formations.index', compact('formations'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.formations.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'formateur' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Sera stocké comme 'photo' dans la base de données
            'url_video' => 'nullable',
            'url_zoom' => 'nullable|string|url',
            'est_actif' => 'boolean',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $data = $request->all();

        // Ajouter l'ID de l'utilisateur connecté
        $data['user_id'] = auth()->id();

        // Upload de l'image
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('formations/images', 'public');
            $data['photo'] = $imagePath;
        }
        
        // Upload de la vidéo
        if ($request->hasFile('url_video')) {
            $videoPath = $request->file('url_video')->store('formations/videos', 'public');
            $data['url_video'] = $videoPath;
        }
        
        
        Formation::create($data);
        
        return redirect()->route('admin.formations.index')->with('success', 'Formation créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $formation = Formation::with('user')->findOrFail($id);
        return view('admin.formations.show', compact('formation'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $formation = Formation::with('user')->findOrFail($id);
        return view('admin.formations.edit', compact('formation'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $formation = Formation::findOrFail($id);

        // Validation des champs obligatoires
        $request->validate([
            'titre' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'formateur' => 'required|string|max:255',
            'description' => 'required|string',
            'domaine' => 'required|string|max:100',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'date' => 'required|date',
            'url_video' => 'nullable|file|mimes:mp4,mov,avi',
            'est_actif' => 'boolean',
            'prix' => 'required|numeric|min:0|max:999999.99',
        ]);
     
        // Validation des fichiers seulement s'ils sont fournis
        
        $data = $request->only([
            'titre', 'type', 'formateur', 'description',
            'date', 'url_video', 'est_actif', 'prix', 'stock'
        ]);


        // Upload de la nouvelle image si fournie
        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image
            if ($formation->image && Storage::disk('public')->exists($formation->image)) {
                Storage::disk('public')->delete($formation->image);
            }
            $imagePath = $request->file('image')->store('formations/images', 'public');
            $data['image'] = $imagePath;
        }
        
        // Upload de la nouvelle vidéo si fournie
        if ($request->hasFile('url_video')) {
            // Supprimer l'ancienne vidéo
            if ($formation->url_video && Storage::disk('public')->exists($formation->url_video)) {
                Storage::disk('public')->delete($formation->url_video);
            }
            $videoPath = $request->file('url_video')->store('formations/videos', 'public');
            $data['url_video'] = $videoPath;
        }
        

     

        $formation->update($data);

        return redirect()->route('admin.formations.index')->with('success', 'Formation mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $formation = Formation::findOrFail($id);
        $formation->delete();
        return redirect()->route('admin.formations.index');
    }
}
