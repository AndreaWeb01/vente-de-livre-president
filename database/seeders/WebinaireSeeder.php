<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Formation;

class WebinaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer un utilisateur existant pour être le créateur des webinaires
        $user = User::first();

        if (!$user) {
            $this->command->error('Aucun utilisateur trouvé. Veuillez d\'abord exécuter les autres seeders.');
            return;
        }

        // Créer des webinaires
        $webinaires = [
            [
                'titre' => 'Introduction à l\'Intelligence Artificielle',
                'type' => 'webinaire',
                'formateur' => 'Dr. Sarah Johnson',
                'description' => 'Découvrez les bases de l\'intelligence artificielle, ses applications pratiques et son impact sur notre société. Ce webinaire couvre les concepts fondamentaux, les algorithmes de base et les tendances actuelles.',
                'domaine' => 'Intelligence Artificielle',
                'date' => '2024-12-15',
                'image' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500',
                'url_video' => 'https://youtube.com/watch?v=ai-intro-webinar',
                'url_zoom' => 'https://zoom.us/j/123456789',
                'est_actif' => true,
                'prix' => 49.99,
            ],
            [
                'titre' => 'Cybersécurité : Protégez votre Entreprise',
                'type' => 'webinaire',
                'formateur' => 'Marc Dubois',
                'description' => 'Apprenez les meilleures pratiques de cybersécurité pour protéger votre entreprise contre les menaces numériques. Analyse de cas réels et solutions concrètes.',
                'domaine' => 'Cybersécurité',
                'date' => '2024-12-20',
                'image' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500',
                'url_video' => 'https://youtube.com/watch?v=cybersecurity-webinar',
                'url_zoom' => 'https://zoom.us/j/987654321',
                'est_actif' => true,
                'prix' => 79.99,
            ],
            [
                'titre' => 'Blockchain et Cryptomonnaies : L\'Avenir de la Finance',
                'type' => 'webinaire',
                'formateur' => 'Alexandre Martin',
                'description' => 'Explorez le monde de la blockchain et des cryptomonnaies. Comprenez les technologies sous-jacentes, les cas d\'usage et les opportunités d\'investissement.',
                'domaine' => 'Blockchain',
                'date' => '2024-12-25',
                'image' => 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500',
                'url_video' => 'https://youtube.com/watch?v=blockchain-webinar',
                'url_zoom' => 'https://zoom.us/j/456789123',
                'est_actif' => true,
                'prix' => 99.99,
            ],
            [
                'titre' => 'Marketing Digital : Stratégies Efficaces',
                'type' => 'webinaire',
                'formateur' => 'Sophie Leroy',
                'description' => 'Maîtrisez les techniques de marketing digital les plus efficaces. SEO, réseaux sociaux, email marketing et publicité en ligne pour booster votre business.',
                'domaine' => 'Marketing Digital',
                'date' => '2024-12-30',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
                'url_video' => 'https://youtube.com/watch?v=marketing-digital-webinar',
                'url_zoom' => 'https://zoom.us/j/789123456',
                'est_actif' => true,
                'prix' => 69.99,
            ],
            [
                'titre' => 'Développement Web Moderne avec React et Node.js',
                'type' => 'webinaire',
                'formateur' => 'Thomas Petit',
                'description' => 'Apprenez à créer des applications web modernes avec React et Node.js. De la conception à la mise en production, découvrez les outils et techniques essentielles.',
                'domaine' => 'Développement Web',
                'date' => '2025-01-05',
                'image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
                'url_video' => 'https://youtube.com/watch?v=react-nodejs-webinar',
                'url_zoom' => 'https://zoom.us/j/321654987',
                'est_actif' => true,
                'prix' => 89.99,
            ],
            [
                'titre' => 'Data Science : Analyse de Données avec Python',
                'type' => 'webinaire',
                'formateur' => 'Dr. Marie Chen',
                'description' => 'Initiation à la data science avec Python. Apprenez à analyser des données, créer des visualisations et construire des modèles prédictifs.',
                'domaine' => 'Data Science',
                'date' => '2025-01-10',
                'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
                'url_video' => 'https://youtube.com/watch?v=python-datascience-webinar',
                'url_zoom' => 'https://zoom.us/j/654987321',
                'est_actif' => true,
                'prix' => 119.99,
            ],
            [
                'titre' => 'Cloud Computing : AWS, Azure et Google Cloud',
                'type' => 'webinaire',
                'formateur' => 'Pierre Moreau',
                'description' => 'Découvrez les principales plateformes cloud et apprenez à choisir la meilleure solution pour vos projets. Migration, sécurité et optimisation des coûts.',
                'domaine' => 'Cloud Computing',
                'date' => '2025-01-15',
                'image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500',
                'url_video' => 'https://youtube.com/watch?v=cloud-computing-webinar',
                'url_zoom' => 'https://zoom.us/j/147258369',
                'est_actif' => true,
                'prix' => 149.99,
            ],
            [
                'titre' => 'UX/UI Design : Créer des Expériences Utilisateur Exceptionnelles',
                'type' => 'webinaire',
                'formateur' => 'Emma Rodriguez',
                'description' => 'Maîtrisez les principes du design UX/UI pour créer des interfaces utilisateur intuitives et engageantes. Outils, méthodologies et bonnes pratiques.',
                'domaine' => 'Design',
                'date' => '2025-01-20',
                'image' => 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=500',
                'url_video' => 'https://youtube.com/watch?v=ux-ui-design-webinar',
                'url_zoom' => 'https://zoom.us/j/369258147',
                'est_actif' => true,
                'prix' => 79.99,
            ],
        ];

        $createdCount = 0;
        foreach ($webinaires as $webinaireData) {
            // Ajouter le champ stock avec une valeur par défaut pour les webinaires
            $webinaireData['stock'] = $webinaireData['stock'] ?? 100;
            
            $webinaire = Formation::firstOrCreate(
                ['titre' => $webinaireData['titre']],
                array_merge($webinaireData, ['user_id' => $user->id])
            );
            
            if ($webinaire->wasRecentlyCreated) {
                $createdCount++;
            }
        }

        $this->command->info("Webinaires créés avec succès !");
        $this->command->info("- {$createdCount} nouveaux webinaires créés");
        $this->command->info("- Total des formations (tous types) : " . Formation::count());
        $this->command->info("- Webinaires uniquement : " . Formation::where('type', 'webinaire')->count());
    }
}

