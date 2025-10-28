<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestAccessController extends Controller
{
    /**
     * Se connecter avec l'utilisateur de test
     */
    public function loginTest()
    {
        $user = User::where('email', 'test.achat@example.com')->first();

        if (!$user) {
            return response()->json(['error' => 'Utilisateur de test non trouvé'], 404);
        }

        Auth::login($user);

        return redirect()->route('mes.formations');
    }

    /**
     * Tester l'accès aux formations
     */
    public function testFormations()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Non connecté'], 401);
        }

        $formations = $user->formationsAchetees()->get();

        return response()->json([
            'user' => $user->email,
            'formations_count' => $formations->count(),
            'formations' => $formations->pluck('titre')
        ]);
    }

    /**
     * Tester l'accès aux livres
     */
    public function testLivres()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Non connecté'], 401);
        }

        $livres = $user->livresAchetes()->get();

        return response()->json([
            'user' => $user->email,
            'livres_count' => $livres->count(),
            'livres' => $livres->pluck('titre')
        ]);
    }
}
