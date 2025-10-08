<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer un utilisateur de test avec toutes les permissions
        $testUser = User::firstOrCreate(
            ['email' => 'test@admin.com'],
            [
                'nom' => 'Test',
                'prenom' => 'Admin',
                'telephone' => '+33123456788',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // Assigner le rôle admin (qui a toutes les permissions)
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole && !$testUser->hasRole('admin')) {
            $testUser->assignRole('admin');
        }

        // Vérifier que l'utilisateur a bien toutes les permissions
        $permissions = Permission::all();
        $userPermissions = $testUser->getAllPermissions();

        $this->command->info("Utilisateur de test créé : {$testUser->email}");
        $this->command->info("Rôles : " . $testUser->getRoleNames()->implode(', '));
        $this->command->info("Permissions : {$userPermissions->count()}/{$permissions->count()}");

        // Afficher toutes les permissions
        $this->command->info("\nPermissions disponibles :");
        foreach ($permissions as $permission) {
            $hasPermission = $userPermissions->contains($permission);
            $status = $hasPermission ? '✅' : '❌';
            $this->command->info("  {$status} {$permission->name}");
        }
    }
}
