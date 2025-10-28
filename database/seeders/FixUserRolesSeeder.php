<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class FixUserRolesSeeder extends Seeder
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

        // Liste des utilisateurs admin (ceux qui devraient avoir le rôle admin)
        $adminEmails = [
            'admin@vente-livre.com',
            'admin@example.com',
            'admin.test@example.com',
            'test@admin.com',
            // Ajoutez ici les emails d'autres admins que vous souhaitez créer
        ];

        // Liste des utilisateurs editor
        $editorEmails = [
            'editor.test@example.com',
            // Ajoutez ici les emails d'autres éditeurs
        ];

        // Corriger les rôles des utilisateurs
        $users = User::all();
        $this->command->info("Nombre total d'utilisateurs: " . $users->count());

        foreach ($users as $user) {
            $currentRoles = $user->getRoleNames()->toArray();
            
            // Assigner le rôle admin
            if (in_array($user->email, $adminEmails)) {
                if (!$user->hasRole('admin')) {
                    $user->assignRole($adminRole);
                    $this->command->info("✅ Rôle ADMIN assigné à: {$user->email}");
                }
            }
            // Assigner le rôle editor
            elseif (in_array($user->email, $editorEmails)) {
                if (!$user->hasRole('editor')) {
                    $user->assignRole($editorRole);
                    $this->command->info("✅ Rôle EDITOR assigné à: {$user->email}");
                }
            }
            // S'assurer que les autres ont au moins le rôle user
            else {
                if (!$user->hasRole('user') && $currentRoles === []) {
                    $user->assignRole($userRole);
                    $this->command->info("✅ Rôle USER assigné à: {$user->email}");
                }
            }
        }

        // Afficher un résumé
        $this->command->info("\n--- Résumé des rôles ---");
        $adminUsers = User::role('admin')->get();
        $editorUsers = User::role('editor')->get();
        $normalUsers = User::role('user')->get();
        
        $this->command->info("👑 Admins (" . $adminUsers->count() . "):");
        foreach ($adminUsers as $user) {
            $this->command->info("  - {$user->email}");
        }
        
        $this->command->info("✏️  Editors (" . $editorUsers->count() . "):");
        foreach ($editorUsers as $user) {
            $this->command->info("  - {$user->email}");
        }
        
        $this->command->info("👤 Users (" . $normalUsers->count() . "):");
        foreach ($normalUsers as $user) {
            $this->command->info("  - {$user->email}");
        }
    }
}

