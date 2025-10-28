<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectBasedOnRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if ($user) {
            $currentRoute = $request->route()->getName();
            $currentPath = $request->path();

            // Log pour debug
            \Log::info('RedirectBasedOnRole', [
                'user_id' => $user->id,
                'user_roles' => $user->getRoleNames(),
                'current_route' => $currentRoute,
                'current_path' => $currentPath
            ]);

            // Rediriger vers la bonne interface selon le rôle
            if ($this->shouldRedirectToAdmin($user, $currentRoute, $currentPath)) {
                \Log::info('Redirecting to admin dashboard');
                return redirect()->route('admin.dashboard');
            }

            if ($this->shouldRedirectToPublic($user, $currentRoute, $currentPath)) {
                \Log::info('Redirecting to public dashboard');
                return redirect()->route('dashboard');
            }
        }

        return $next($request);
    }

    /**
     * Vérifie si l'utilisateur est déjà dans la bonne interface
     */
    private function isInCorrectInterface($user, $currentPath): bool
    {
        $isAdmin = $user->hasRole('admin') || $user->hasRole('editor');
        $isInAdmin = str_starts_with($currentPath, 'admin/');

        // Si admin et dans admin, ou si utilisateur normal et pas dans admin
        return ($isAdmin && $isInAdmin) || (!$isAdmin && !$isInAdmin);
    }

    /**
     * Détermine si l'utilisateur doit être redirigé vers l'admin
     */
    private function shouldRedirectToAdmin($user, $currentRoute, $currentPath): bool
    {
        // Si l'utilisateur est admin/editor et accède au dashboard public
        if (($user->hasRole('admin') || $user->hasRole('editor')) && $currentRoute === 'dashboard') {
            return true;
        }

        return false;
    }

    /**
     * Détermine si l'utilisateur doit être redirigé vers le public
     */
    private function shouldRedirectToPublic($user, $currentRoute, $currentPath): bool
    {
        // Si l'utilisateur n'a pas de rôle admin/editor et accède à l'admin
        if (!$user->hasRole('admin') && !$user->hasRole('editor') && str_starts_with($currentPath, 'admin/')) {
            return true;
        }

        return false;
    }
}
