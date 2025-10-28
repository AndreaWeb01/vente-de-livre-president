<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Formation;
use App\Models\Livre;
use App\Models\Commande;
use App\Models\Achat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AchatTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer un utilisateur de test
        $user = User::firstOrCreate(
            ['email' => 'test.achat@example.com'],
            [
                'nom' => 'Test',
                'prenom' => 'Achat',
                'telephone' => '+33123456799',
                'adresse' => '123 Rue de Test',
                'ville' => 'Paris',
                'quartier' => 'Centre',
                'password' => bcrypt('password'),
            ]
        );

        // Créer 2 formations de test
        $formation1 = Formation::firstOrCreate(
            ['titre' => 'Formation React Avancé'],
            [
                'user_id' => $user->id,
                'type' => 'En ligne',
                'formateur' => 'Jean Dupont',
                'description' => 'Formation complète sur React avec hooks, context et performance.',
                'domaine' => 'Développement Web',
                'date' => '2024-12-15',
                'image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
                'url_video' => 'https://youtube.com/watch?v=react-formation',
                'url_zoom' => 'https://example.com/react-formation.pdf',
                'est_actif' => true,
                'prix' => 299.99,
            ]
        );

        $formation2 = Formation::firstOrCreate(
            ['titre' => 'Formation Laravel Expert'],
            [
                'user_id' => $user->id,
                'type' => 'Présentiel',
                'formateur' => 'Marie Martin',
                'description' => 'Maîtrisez Laravel avec les bonnes pratiques et l\'architecture.',
                'domaine' => 'Backend',
                'date' => '2024-12-20',
                'image' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
                'url_video' => 'https://youtube.com/watch?v=laravel-formation',
                'url_zoom' => 'https://example.com/laravel-formation.pdf',
                'est_actif' => true,
                'prix' => 399.99,
            ]
        );

        // Créer 2 livres de test
        $livre1 = Livre::firstOrCreate(
            ['titre' => 'Guide Complet de React'],
            [
                'auteur_id' => 1, // Supposons qu'il y ait un auteur avec l'ID 1
                'description' => 'Un guide complet pour maîtriser React de A à Z.',
                'page' => 350,
                'type' => 'numerique',
                'langue' => 'Français',
                'photo' => 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300',
                'livrepdf' => 'https://example.com/guide-react.pdf',
                'date_publication' => '2024-01-15',
                'prix' => 29.99,
                'stock' => 100,
                'est_actif' => true,
            ]
        );

        $livre2 = Livre::firstOrCreate(
            ['titre' => 'Laravel: Les Bonnes Pratiques'],
            [
                'auteur_id' => 1, // Supposons qu'il y ait un auteur avec l'ID 1
                'description' => 'Découvrez les meilleures pratiques pour développer avec Laravel.',
                'page' => 280,
                'type' => 'physique',
                'langue' => 'Français',
                'photo' => 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300',
                'livrepdf' => 'https://example.com/laravel-bonnes-pratiques.pdf',
                'date_publication' => '2024-02-10',
                'prix' => 34.99,
                'stock' => 50,
                'est_actif' => true,
            ]
        );

        // Créer une commande payée
        $commande = Commande::create([
            'user_id' => $user->id,
            'total' => $formation1->prix + $formation2->prix + $livre1->prix + $livre2->prix,
            'statut' => 'payee',
            'reference' => 'CMD-' . time(),
            'date_paiement' => now(),
        ]);

        // Créer les achats
        Achat::create([
            'commande_id' => $commande->id,
            'user_id' => $user->id,
            'achetable_type' => Formation::class,
            'achetable_id' => $formation1->id,
            'prix' => $formation1->prix,
        ]);

        Achat::create([
            'commande_id' => $commande->id,
            'user_id' => $user->id,
            'achetable_type' => Formation::class,
            'achetable_id' => $formation2->id,
            'prix' => $formation2->prix,
        ]);

        Achat::create([
            'commande_id' => $commande->id,
            'user_id' => $user->id,
            'achetable_type' => Livre::class,
            'achetable_id' => $livre1->id,
            'prix' => $livre1->prix,
        ]);

        Achat::create([
            'commande_id' => $commande->id,
            'user_id' => $user->id,
            'achetable_type' => Livre::class,
            'achetable_id' => $livre2->id,
            'prix' => $livre2->prix,
        ]);

        $this->command->info('Seeder d\'achats de test créé avec succès !');
        $this->command->info('Utilisateur de test: test.achat@example.com / password');
        $this->command->info('2 formations et 2 livres achetés créés.');
    }
}
