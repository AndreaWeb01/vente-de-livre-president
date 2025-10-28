<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class AuthenticatedPublicController extends Controller
{
    /**
     * Affiche la page de connexion.
     */
    public function showLoginForm()
    {
        return Inertia::render('Login', [
            'canResetPassword' => Route::has('password.request'),
        ]);
    }

    public function login(Request $request)
    {
        $login = $request->input('email') ?: $request->input('telephone');
        $password = $request->input('password');
        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'telephone';

        if (Auth::attempt([$fieldType => $login, 'password' => $password], $request->boolean('remember'))) {
            $user = Auth::user();
            $request->session()->regenerate();
            
            if ($user->hasRole('admin') || $user->hasRole('editor')) {
                return redirect()->intended(route('admin.dashboard'));
            }
            return redirect()->intended(route('dashboard'));
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
