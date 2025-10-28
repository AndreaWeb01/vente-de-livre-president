<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserRoleTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer les rôles
        $adminRole = Role::where('name', 'admin')->first();
        $editorRole = Role::where('name', 'editor')->first();
        $userRole = Role::where('name', 'user')->first();

        if (!$adminRole || !$editorRole || !$userRole) {
            $this->command->error('Les rôles n\'existent pas. Exécutez d\'abord RolePermissionSeeder.');
            return;
        }

        // Créer un utilisateur admin
        $adminUser = User::firstOrCreate(
            ['email' => 'admin.test@example.com'],
            [
                'nom' => 'Admin',
                'prenom' => 'Test',
                'telephone' => '+33123456778',
                'adresse' => '123 Rue Admin',
                'ville' => 'Paris',
                'quartier' => 'Centre',
                'password' => bcrypt('password'),
            ]
        );

        if (!$adminUser->hasRole('admin')) {
            $adminUser->assignRole($adminRole);
        }

        // Créer un utilisateur éditeur
        $editorUser = User::firstOrCreate(
            ['email' => 'editor.test@example.com'],
            [
                'nom' => 'Editor',
                'prenom' => 'Test',
                'telephone' => '+33123456777',
                'adresse' => '456 Rue Editor',
                'ville' => 'Lyon',
                'quartier' => 'Centre',
                'password' => bcrypt('password'),
            ]
        );

        if (!$editorUser->hasRole('editor')) {
            $editorUser->assignRole($editorRole);
        }

        // Créer un utilisateur normal
        $normalUser = User::firstOrCreate(
            ['email' => 'user.test@example.com'],
            [
                'nom' => 'User',
                'prenom' => 'Test',
                'telephone' => '+33123456776',
                'adresse' => '789 Rue User',
                'ville' => 'Marseille',
                'quartier' => 'Centre',
                'password' => bcrypt('password'),
            ]
        );

        if (!$normalUser->hasRole('user')) {
            $normalUser->assignRole($userRole);
        }

        $this->command->info('Utilisateurs de test créés avec succès !');
        $this->command->info('Admin: admin.test@example.com / password');
        $this->command->info('Éditeur: editor.test@example.com / password');
        $this->command->info('Utilisateur: user.test@example.com / password');
    }
}
