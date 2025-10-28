<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class ImportUsersFromCSVSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // S'assurer que les rôles existent
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $editorRole = Role::firstOrCreate(['name' => 'editor']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Détecter les admins par leur nom ou email
        $adminEmails = [
            'admin@example.com',
            'admin@vente-livre.com',
            'test@admin.com',
            'admin@test.com',
            'admin.test@example.com',
        ];  

        // Détecter les editors
        $editorEmails = [
            'editor@test.com',
            'editor.test@example.com',
        ];

        $this->command->info("Importation et correction des rôles...\n");

        // Créer ou récupérer tous les utilisateurs
        $usersData = [
            ['email' => 'test@example.com', 'nom' => 'Test', 'prenom' => 'User', 'telephone' => '0123456789', 'password' => bcrypt('password')],
            ['email' => 'admin@example.com', 'nom' => 'Admin', 'prenom' => 'System', 'telephone' => '+33123456789', 'password' => bcrypt('password')],
            ['email' => 'test@admin.com', 'nom' => 'Test', 'prenom' => 'Admin', 'telephone' => '+33123456788', 'password' => bcrypt('password')],
            ['email' => 'admin@test.com', 'nom' => 'Dupont', 'prenom' => 'Jean', 'telephone' => '+33123456701', 'adresse' => '123 Rue de la Paix', 'ville' => 'Paris', 'quartier' => 'Centre', 'password' => bcrypt('password')],
            ['email' => 'editor@test.com', 'nom' => 'Martin', 'prenom' => 'Marie', 'telephone' => '+33123456702', 'adresse' => '456 Avenue des Champs', 'ville' => 'Lyon', 'quartier' => 'Presqu\'île', 'password' => bcrypt('password')],
            ['email' => 'user@test.com', 'nom' => 'Durand', 'prenom' => 'Pierre', 'telephone' => '+33123456703', 'adresse' => '789 Boulevard Saint-Germain', 'ville' => 'Marseille', 'quartier' => 'Vieux Port', 'password' => bcrypt('password')],
            ['email' => 'victor.hugo@email.com', 'nom' => 'Hugo', 'prenom' => 'Victor', 'telephone' => '+33123456720', 'adresse' => '6 Place des Vosges', 'ville' => 'Paris', 'quartier' => 'Marais', 'password' => bcrypt('password')],
            ['email' => 'emile.zola@email.com', 'nom' => 'Zola', 'prenom' => 'Émile', 'telephone' => '+33123456721', 'adresse' => '21 Rue de Bruxelles', 'ville' => 'Paris', 'quartier' => 'Pigalle', 'password' => bcrypt('password')],
            ['email' => 'albert.camus@email.com', 'nom' => 'Camus', 'prenom' => 'Albert', 'telephone' => '+33123456722', 'adresse' => '2 Rue de l\'Université', 'ville' => 'Alger', 'quartier' => 'Centre', 'password' => bcrypt('password')],
            ['email' => 'jean-paul.sartre@email.com', 'nom' => 'Sartre', 'prenom' => 'Jean-Paul', 'telephone' => '+33123456723', 'adresse' => '42 Rue Bonaparte', 'ville' => 'Paris', 'quartier' => 'Saint-Germain', 'password' => bcrypt('password')],
            ['email' => 'test.achat@example.com', 'nom' => 'Test', 'prenom' => 'Achat', 'telephone' => '+33123456799', 'adresse' => '123 Rue de Test', 'ville' => 'Paris', 'quartier' => 'Centre', 'password' => bcrypt('password')],
            ['email' => 'admin.test@example.com', 'nom' => 'Admin', 'prenom' => 'Test', 'telephone' => '+33123456778', 'adresse' => '123 Rue Admin', 'ville' => 'Paris', 'quartier' => 'Centre', 'password' => bcrypt('password')],
            ['email' => 'editor.test@example.com', 'nom' => 'Editor', 'prenom' => 'Test', 'telephone' => '+33123456777', 'adresse' => '456 Rue Editor', 'ville' => 'Lyon', 'quartier' => 'Centre', 'password' => bcrypt('password')],
            ['email' => 'user.test@example.com', 'nom' => 'User', 'prenom' => 'Test', 'telephone' => '+33123456776', 'adresse' => '789 Rue User', 'ville' => 'Marseille', 'quartier' => 'Centre', 'password' => bcrypt('password')],
        ];

        $this->command->info("Création des utilisateurs...");
        foreach ($usersData as $userData) {
            User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }

        // Corriger les rôles des utilisateurs
        $users = User::all();
        
        // Nettoyer tous les rôles existants
        $this->command->info("Nettoyage des rôles existants...");
        foreach ($users as $user) {
            $user->roles()->sync([]);
        }

        // Réassigner tous les rôles
        $this->command->info("Réassignation des rôles...\n");
        foreach ($users as $user) {
            // Assigner le bon rôle selon l'email
            if (in_array($user->email, $adminEmails)) {
                $user->assignRole($adminRole);
                $this->command->info("✅ ADMIN : {$user->nom} {$user->prenom} ({$user->email})");
            } elseif (in_array($user->email, $editorEmails)) {
                $user->assignRole($editorRole);
                $this->command->info("✏️  EDITOR : {$user->nom} {$user->prenom} ({$user->email})");
            } else {
                $user->assignRole($userRole);
                $this->command->info("👤 USER : {$user->nom} {$user->prenom} ({$user->email})");
            }
        }

        // Afficher un résumé final
        $this->command->info("\n" . str_repeat('=', 60));
        $this->command->info("RÉSUMÉ DES RÔLES");
        $this->command->info(str_repeat('=', 60) . "\n");

        $adminUsers = User::role('admin')->get();
        $editorUsers = User::role('editor')->get();
        $normalUsers = User::role('user')->get();
        
        $this->command->info("👑 ADMINS ({$adminUsers->count()}) :");
        foreach ($adminUsers as $user) {
            $this->command->info("  - {$user->email}");
        }
        
        $this->command->info("\n✏️  EDITORS ({$editorUsers->count()}) :");
        foreach ($editorUsers as $user) {
            $this->command->info("  - {$user->email}");
        }
        
        $this->command->info("\n👤 USERS ({$normalUsers->count()}) :");
        foreach ($normalUsers as $user) {
            $this->command->info("  - {$user->email}");
        }
        
        $this->command->info("\n" . str_repeat('=', 60));
        $this->command->info("✅ Tous les rôles ont été correctement assignés !");
        $this->command->info(str_repeat('=', 60));
    }
}

