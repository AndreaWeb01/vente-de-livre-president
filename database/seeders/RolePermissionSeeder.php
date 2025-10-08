<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer les permissions
        $permissions = [
            // Permissions pour les utilisateurs
            'view users',
            'create users',
            'edit users',
            'delete users',

            // Permissions pour les auteurs
            'view auteurs',
            'create auteurs',
            'edit auteurs',
            'delete auteurs',

            // Permissions pour les livres
            'view livres',
            'create livres',
            'edit livres',
            'delete livres',

            // Permissions pour les formations
            'view formations',
            'create formations',
            'edit formations',
            'delete formations',

            // Permissions pour les rôles
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',

            // Permissions pour les permissions
            'view permissions',
            'create permissions',
            'edit permissions',
            'delete permissions',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Créer les rôles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $editorRole = Role::firstOrCreate(['name' => 'editor']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Assigner toutes les permissions au rôle admin
        $adminRole->givePermissionTo(Permission::all());

        // Assigner des permissions limitées au rôle editor
        $editorRole->givePermissionTo([
            'view users',
            'view auteurs',
            'view livres',
            'create livres',
            'edit livres',
            'view formations',
            'create formations',
            'edit formations',
        ]);

        // Assigner des permissions de base au rôle user
        $userRole->givePermissionTo([
            'view livres',
            'view formations',
        ]);

        // Créer un utilisateur admin par défaut s'il n'existe pas
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'nom' => 'Admin',
                'prenom' => 'System',
                'telephone' => '+33123456789',
                'password' => bcrypt('password'),
            ]
        );

        // Assigner le rôle admin à l'utilisateur admin
        if (!$adminUser->hasRole('admin')) {
            $adminUser->assignRole('admin');
        }
    }
}
