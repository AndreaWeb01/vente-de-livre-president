<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class AuthenticatedPublicController extends Controller
{
    public function create()
    {
        return Inertia::render('Inscription');
    }
    public function store(Request $request) { 
        $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'telephone' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);   
        $user = User::create([
            'prenom' => $request->prenom,
            'nom' => $request->nom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'password' => Hash::make($request->password),
        ]);

        // Assigner le rôle utilisateur par défaut
        $user->assignRole('user');

        event(new Registered($user));

       
        return redirect()->route("login")->with('success', 'Inscription réussie !');

    }
    public function showLoginForm()
    {
        return Inertia::render('Login');
    }


    public function login(Request $request)
    {
        $login = $request->input('email') ?: $request->input('telephone');
        $password = $request->input('password');
        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'telephone';

        if (Auth::attempt([$fieldType => $login, 'password' => $password], $request->boolean('remember'))) {
            $user = Auth::user();
            $request->session()->regenerate();
            return redirect()->intended(route('public.dashboard'));
        }
        return back()->withErrors([
            'email' => 'Les informations de connexion sont incorrectes.'
        ]);

         
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
