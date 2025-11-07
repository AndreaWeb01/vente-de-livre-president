<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\phothotheque;

use Inertia\Inertia;

class PhotothequeController extends Controller
{
    /**
     * Display a listing of the photothèque.
     */
    public function index(Request $request)
    {
        $phototheques = phothotheque::all();
        return Inertia::render('Phototheque', [
            'phototheques' => $phototheques->toArray(),
            'filters' => $request->only(['search', 'category'])
        ]);
    }
}
