<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Formation;
use App\Models\User;

class FormationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer quelques utilisateurs existants
        $users = User::limit(3)->get();

        if ($users->isEmpty()) {
            $this->command->info('Aucun utilisateur trouvé. Créez d\'abord des utilisateurs.');
            return;
        }

        $formations = [
            [
                'user_id' => $users[0]->id,
                'titre' => 'Développement Web avec React',
                'type' => 'En ligne',
                'formateur' => 'Jean Dupont',
                'description' => 'Formation complète sur le développement d\'applications web modernes avec React, incluant les hooks, le state management et les bonnes pratiques.',
                'domaine' => 'Développement Web',
                'date' => '2024-02-15',
                'image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
                'url_video' => 'https://youtube.com/watch?v=example1',
                'url_zoom' => 'https://example.com/react-formation.pdf',
                'est_actif' => true,
                'prix' => 299.99,
                
            ],
            [
                'user_id' => $users[0]->id,
                'titre' => 'Gestion de Projet Agile',
                'type' => 'Présentiel',
                'formateur' => 'Marie Martin',
                'description' => 'Apprenez les méthodologies agiles, Scrum, Kanban et les outils de gestion de projet pour améliorer l\'efficacité de vos équipes.',
                'domaine' => 'Management',
                'date' => '2024-03-10',
                'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
                'url_video' => 'https://youtube.com/watch?v=example2',
                'url_zoom' => 'https://example.com/agile-formation.pdf',
                'est_actif' => true,
                'prix' => 450.00,
              
            ],
            [
                'user_id' => $users[1]->id ?? $users[0]->id,
                'titre' => 'Data Science avec Python',
                'type' => 'Hybride',
                'formateur' => 'Pierre Durand',
                'description' => 'Formation intensive sur l\'analyse de données, le machine learning et la visualisation avec Python et ses bibliothèques.',
                'domaine' => 'Data Science',
                'date' => '2024-04-05',
                'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
                'url_video' => 'https://youtube.com/watch?v=example3',
                'url_zoom' => 'https://example.com/python-formation.pdf',
                'est_actif' => true,
                'prix' => 599.99,
                'stock' => 25,
            ],
            [
                'user_id' => $users[2]->id ?? $users[0]->id,
                'titre' => 'Marketing Digital Avancé',
                'type' => 'En ligne',
                'formateur' => 'Sophie Leroy',
                'description' => 'Maîtrisez les stratégies de marketing digital, SEO, SEM, réseaux sociaux et analytics pour booster votre présence en ligne.',
                'domaine' => 'Marketing',
                'date' => '2024-05-20',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
                'url_video' => 'https://youtube.com/watch?v=example4',
                'url_zoom' => 'https://example.com/marketing-formation.pdf',
                'est_actif' => true,
                'prix' => 399.99,
                'stock' => 30,
            ],
            [
                'user_id' => $users[0]->id,
                'titre' => 'Cybersécurité pour Débutants',
                'type' => 'Présentiel',
                'formateur' => 'Alexandre Moreau',
                'description' => 'Introduction à la cybersécurité, protection des données, bonnes pratiques et outils de sécurité informatique.',
                'domaine' => 'Sécurité',
                'date' => '2024-06-15',
                'image' => 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500',
                'url_video' => null,
                'url_zoom' => 'https://example.com/cybersecurite-formation.pdf',
                'est_actif' => false,
                'prix' => 350.00,
                'stock' => 10,
            ],
            [
                'user_id' => $users[1]->id ?? $users[0]->id,
                'titre' => 'Design UX/UI',
                'type' => 'Hybride',
                'formateur' => 'Emma Rousseau',
                'description' => 'Apprenez les principes du design d\'expérience utilisateur et d\'interface utilisateur avec les outils modernes comme Figma.',
                'domaine' => 'Design',
                'date' => '2024-07-08',
                'image' => 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=500',
                'url_video' => 'https://youtube.com/watch?v=example5',
                'url_zoom' => 'https://example.com/design-formation.pdf',
                'est_actif' => true,
                'prix' => 499.99,
                'stock' => 18,
            ],
        ];

        foreach ($formations as $formationData) {
            Formation::create($formationData);
        }

        $this->command->info('Formations créées avec succès !');
        $this->command->info('- ' . count($formations) . ' formations créées');
        $this->command->info('- Types: Présentiel, En ligne, Hybride');
        $this->command->info('- Domaines: Développement, Management, Data Science, Marketing, Sécurité, Design');
    }
}
