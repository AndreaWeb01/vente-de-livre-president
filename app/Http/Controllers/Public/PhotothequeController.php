<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PhotothequeController extends Controller
{
    /**
     * Display a listing of the photothèque.
     */
    public function index(Request $request)
    {
        // Pour l'instant, retournons une page vide
        // Vous pouvez ajouter la logique pour récupérer les images de la photothèque
        $images = []; // À remplacer par la logique de récupération des images
        
        return Inertia::render('Phototheque', [
            'images' => $images,
            'filters' => $request->only(['search', 'category'])
        ]);
    }
}
