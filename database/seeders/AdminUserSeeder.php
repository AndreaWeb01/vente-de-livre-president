<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // S'assurer que le rôle admin existe
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        
        // Vérifier si l'utilisateur admin existe déjà
        $adminUser = User::where('email', 'admin@vente-livre.com')->first();
        
        if (!$adminUser) {
            // Créer l'utilisateur admin
            $adminUser = User::create([
                'nom' => 'Administrateur',
                'prenom' => 'Principal',
                'telephone' => '+33987654321',
                'adresse' => 'Siège social',
                'ville' => 'Paris',
                'quartier' => 'Centre',
                'email' => 'admin@vente-livre.com',
                'password' => bcrypt('admin123'),
                'email_verified_at' => now(),
            ]);
        }

        // Assigner le rôle admin
        $wasAdmin = $adminUser->hasRole('admin');
        if (!$wasAdmin) {
            $adminUser->assignRole($adminRole);
        }

        $this->command->info('✅ Utilisateur admin configuré avec succès !');
        $this->command->info('📧 Email: admin@vente-livre.com');
        $this->command->info('🔑 Mot de passe: admin123');
        
        if (!$wasAdmin) {
            $this->command->warn('⚠️  Veuillez changer le mot de passe après votre première connexion.');
        } else {
            $this->command->info('ℹ️  L\'utilisateur avait déjà le rôle admin.');
        }
    }
}

