<?php

namespace App\Http\Middleware;

use App\Models\Livre;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckLivreAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $livreId = $request->route('id') ?? $request->route('livre');
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $livre = Livre::find($livreId);

        if (!$livre) {
            abort(404, 'Livre non trouvé');
        }

        // Vérifier si l'utilisateur a acheté ce livre
        $hasAccess = $user->livresAchetes()->where('livres.id', $livreId)->exists();

        if (!$hasAccess) {
            abort(403, 'Accès refusé. Vous devez acheter ce livre pour y accéder.');
        }

        return $next($request);
    }
}
