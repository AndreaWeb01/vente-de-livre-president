<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebinaireController extends Controller
{
    /**
     * Display a listing of webinaires.
     */
    public function index(Request $request)
    {
        $query = Formation::where('type', 'webinaire');

        // Filtres
        if ($request->filled('search')) {
            $query->where('titre', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('domaine')) {
            $query->where('domaine', $request->domaine);
        }

        $webinaires = $query->orderBy('created_at', 'desc')->paginate(12);

        return Inertia::render('Webinaire', [
            'webinaires' => $webinaires,
            'filters' => $request->only(['search', 'domaine'])
        ]);
    }

    /**
     * Display the specified webinaire.
     */
    public function show(string $id)
    {
        $webinaire = Formation::where('type', 'webinaire')->findOrFail($id);
        
        return Inertia::render('WebinaireDetail', [
            'webinaire' => $webinaire
        ]);
    }
}
