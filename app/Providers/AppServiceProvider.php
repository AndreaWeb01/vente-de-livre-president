<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Http;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configurer Laravel Http pour ignorer la vérification SSL en développement local
        // Solution pour Windows où les certificats CA peuvent ne pas être configurés
        if (!config('moneroo.verify_ssl', true) && app()->environment('local')) {
            // Télécharger le certificat CA depuis curl.se si nécessaire
            $cacertPath = storage_path('app/cacert.pem');
            
            if (!file_exists($cacertPath)) {
                // Télécharger le certificat CA bundle depuis curl.se
                $cacertUrl = 'https://curl.se/ca/cacert.pem';
                $cacertContent = @file_get_contents($cacertUrl, false, stream_context_create([
                    'http' => [
                        'timeout' => 10,
                        'ignore_errors' => true,
                    ],
                ]));
                
                if ($cacertContent !== false && strlen($cacertContent) > 1000) {
                    @file_put_contents($cacertPath, $cacertContent);
                }
            }
            
            // Configurer Laravel Http pour utiliser le certificat CA ou désactiver la vérification
            if (file_exists($cacertPath) && filesize($cacertPath) > 1000) {
                // Utiliser le certificat CA téléchargé
                Http::macro('moneroo', function () use ($cacertPath) {
                    return Http::withOptions([
                        'verify' => $cacertPath,
                    ]);
                });
            } else {
                // Désactiver la vérification SSL (développement uniquement)
                Http::macro('moneroo', function () {
                    return Http::withoutVerifying();
                });
            }
            
            // Appliquer la configuration globalement pour toutes les requêtes Http
            Http::globalOptions([
                'verify' => file_exists($cacertPath) && filesize($cacertPath) > 1000 
                    ? $cacertPath 
                    : false,
            ]);
        }
    }
}
