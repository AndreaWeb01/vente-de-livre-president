<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create()
    {
        return Inertia::render('Inscription');
    }
    public function store(Request $request): RedirectResponse
    {
        $user = User::create([
            'prenom' => $request->prenom,
            'nom' => $request->nom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'password' => Hash::make($request->password),
        ]);

        // Assigner le rôle utilisateur par défaut
        $user->assignRole('admin');

        event(new Registered($user));

        Auth::login($user);

        // Redirection basée sur le rôle
        
        return redirect(route('admin.dashboard'));
    }
}
