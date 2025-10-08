<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Auteur;
use App\Models\Livre;
use Spatie\Permission\Models\Role;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer des utilisateurs avec différents rôles
        $adminRole = Role::where('name', 'admin')->first();
        $editorRole = Role::where('name', 'editor')->first();
        $userRole = Role::where('name', 'user')->first();

        // Utilisateur admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@test.com'],
            [
                'nom' => 'Dupont',
                'prenom' => 'Jean',
                'telephone' => '+33123456701',
                'password' => bcrypt('password'),
                'adresse' => '123 Rue de la Paix',
                'ville' => 'Paris',
                'quartier' => 'Centre',
            ]
        );
        $admin->assignRole($adminRole);

        // Utilisateur éditeur
        $editor = User::firstOrCreate(
            ['email' => 'editor@test.com'],
            [
                'nom' => 'Martin',
                'prenom' => 'Marie',
                'telephone' => '+33123456702',
                'password' => bcrypt('password'),
                'adresse' => '456 Avenue des Champs',
                'ville' => 'Lyon',
                'quartier' => 'Presqu\'île',
            ]
        );
        $editor->assignRole($editorRole);

        // Utilisateur simple
        $user = User::firstOrCreate(
            ['email' => 'user@test.com'],
            [
                'nom' => 'Durand',
                'prenom' => 'Pierre',
                'telephone' => '+33123456703',
                'password' => bcrypt('password'),
                'adresse' => '789 Boulevard Saint-Germain',
                'ville' => 'Marseille',
                'quartier' => 'Vieux Port',
            ]
        );
        $user->assignRole($userRole);

        // Créer des utilisateurs auteurs
        $auteurUsers = [
            [
                'email' => 'victor.hugo@email.com',
                'nom' => 'Hugo',
                'prenom' => 'Victor',
                'telephone' => '+33123456720',
                'password' => bcrypt('password'),
                'adresse' => '6 Place des Vosges',
                'ville' => 'Paris',
                'quartier' => 'Marais',
                'biographie' => 'Écrivain, poète et dramaturge français du XIXe siècle, considéré comme l\'un des plus importants écrivains de langue française.',
            ],
            [
                'email' => 'emile.zola@email.com',
                'nom' => 'Zola',
                'prenom' => 'Émile',
                'telephone' => '+33123456721',
                'password' => bcrypt('password'),
                'adresse' => '21 Rue de Bruxelles',
                'ville' => 'Paris',
                'quartier' => 'Pigalle',
                'biographie' => 'Écrivain et journaliste français, considéré comme le chef de file du naturalisme.',
            ],
            [
                'email' => 'albert.camus@email.com',
                'nom' => 'Camus',
                'prenom' => 'Albert',
                'telephone' => '+33123456722',
                'password' => bcrypt('password'),
                'adresse' => '2 Rue de l\'Université',
                'ville' => 'Alger',
                'quartier' => 'Centre',
                'biographie' => 'Écrivain, philosophe, romancier, dramaturge, essayiste et nouvelliste français. Il fut aussi un journaliste militant engagé dans la Résistance française.',
            ],
            [
                'email' => 'jean-paul.sartre@email.com',
                'nom' => 'Sartre',
                'prenom' => 'Jean-Paul',
                'telephone' => '+33123456723',
                'password' => bcrypt('password'),
                'adresse' => '42 Rue Bonaparte',
                'ville' => 'Paris',
                'quartier' => 'Saint-Germain',
                'biographie' => 'Écrivain et philosophe français, représentant du courant existentialiste.',
            ],
        ];

        $auteurIds = [];
        foreach ($auteurUsers as $userData) {
            $biographie = $userData['biographie'];
            unset($userData['biographie']);

            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );

            $auteur = Auteur::firstOrCreate(
                ['user_id' => $user->id],
                ['biographie' => $biographie]
            );
            $auteurIds[] = $auteur->id;
        }

        // Créer des livres
        $livres = [
            [
                'titre' => 'Les Misérables',
                'auteur_id' => $auteurIds[0], // Hugo
                'description' => 'Un roman historique français de Victor Hugo, publié en 1862. Il s\'agit d\'une des œuvres les plus connues de la littérature française.',
                'page' => 1463,
                'type' => 'Roman',
                'langue' => 'Français',
                'photo' => 'https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Les+Misérables',
                'date_publication' => '1862-01-01',
                'prix' => 12.99,
                'stock' => 25,
                'est_actif' => true,
            ],
            [
                'titre' => 'Germinal',
                'auteur_id' => $auteurIds[1], // Zola
                'description' => 'Un roman d\'Émile Zola publié en 1885. C\'est le treizième volume de la série Les Rougon-Macquart.',
                'page' => 592,
                'type' => 'Roman',
                'langue' => 'Français',
                'photo' => 'https://via.placeholder.com/300x400/059669/FFFFFF?text=Germinal',
                'date_publication' => '1885-01-01',
                'prix' => 9.99,
                'stock' => 18,
                'est_actif' => true,
            ],
            [
                'titre' => 'L\'Étranger',
                'auteur_id' => $auteurIds[2], // Camus
                'description' => 'Un roman d\'Albert Camus, paru en 1942. Il fait partie du « cycle de l\'absurde », une trilogie d\'œuvres de Camus composée d\'un roman, d\'un essai et d\'une pièce de théâtre.',
                'page' => 159,
                'type' => 'Roman',
                'langue' => 'Français',
                'photo' => 'https://via.placeholder.com/300x400/DC2626/FFFFFF?text=L\'Étranger',
                'date_publication' => '1942-01-01',
                'prix' => 7.99,
                'stock' => 32,
                'est_actif' => true,
            ],
            [
                'titre' => 'La Nausée',
                'auteur_id' => $auteurIds[3], // Sartre
                'description' => 'Le premier roman de Jean-Paul Sartre, publié en 1938. C\'est un roman philosophique qui explore les thèmes de l\'existence et de l\'absurdité.',
                'page' => 248,
                'type' => 'Roman',
                'langue' => 'Français',
                'photo' => 'https://via.placeholder.com/300x400/7C3AED/FFFFFF?text=La+Nausée',
                'date_publication' => '1938-01-01',
                'prix' => 8.99,
                'stock' => 15,
                'est_actif' => true,
            ],
            [
                'titre' => 'Notre-Dame de Paris',
                'auteur_id' => $auteurIds[0], // Hugo
                'description' => 'Un roman de Victor Hugo publié en 1831. L\'histoire se déroule à Paris en 1482.',
                'page' => 940,
                'type' => 'Roman',
                'langue' => 'Français',
                'photo' => 'https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Notre-Dame',
                'date_publication' => '1831-01-01',
                'prix' => 11.99,
                'stock' => 20,
                'est_actif' => true,
            ],
        ];

        foreach ($livres as $livreData) {
            Livre::create($livreData);
        }

        $this->command->info("Données de test créées avec succès !");
        $this->command->info("- 3 utilisateurs avec différents rôles");
        $this->command->info("- 4 auteurs");
        $this->command->info("- 5 livres");
        $this->command->info("\nComptes de test :");
        $this->command->info("Admin: test@admin.com / password");
        $this->command->info("Admin2: admin@test.com / password");
        $this->command->info("Editor: editor@test.com / password");
        $this->command->info("User: user@test.com / password");
    }
}
