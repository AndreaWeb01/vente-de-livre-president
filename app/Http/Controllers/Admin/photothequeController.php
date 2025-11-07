<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\phothotheque;
use Illuminate\Http\Request;

class photothequeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $phototheques = phothotheque::all();
        return view('admin.phototheque.index', [
            'phototheques' => $phototheques,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.phototheque.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'required|string',
            'date' => 'required|date',
        ]);
        $photo = $request->file('photo');
        $photoName = time().'.'.$photo->extension();
        $photo->move(public_path('images/phototheque'), $photoName);
        phothotheque::create([
            'titre' => $request->titre,
            'photo' => $photoName,
            'description' => $request->description,
            'date' => $request->date,
        ]);
        return redirect()->route('admin.phototheque.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $phototheque = phothotheque::find($id);
        return view('admin.phototheque.show', [
            'phototheque' => $phototheque,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $phototheque = phothotheque::find($id);
        return view('admin.phototheque.edit', [
            'phototheque' => $phototheque,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'required|string',
            'date' => 'required|date',
        ]);
        $phototheque = phothotheque::find($id);
        $photo = $request->file('photo');
        $photoName = time().'.'.$photo->extension();
        $photo->move(public_path('images/phototheque'), $photoName);
        $phototheque->update([
            'titre' => $request->titre,
            'photo' => $photoName,
            'description' => $request->description,
            'date' => $request->date,
        ]);
        return redirect()->route('admin.phototheque.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
