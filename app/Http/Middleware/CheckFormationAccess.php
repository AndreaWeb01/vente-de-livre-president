<?php

namespace App\Http\Middleware;

use App\Models\Formation;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckFormationAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $formationId = $request->route('id') ?? $request->route('formation');
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $formation = Formation::find($formationId);

        if (!$formation) {
            abort(404, 'Formation non trouvée');
        }

        // Vérifier si l'utilisateur a acheté cette formation
        $hasAccess = $user->formationsAchetees()->where('formations.id', $formationId)->exists();

        if (!$hasAccess) {
            abort(403, 'Accès refusé. Vous devez acheter cette formation pour y accéder.');
        }

        return $next($request);
    }
}
