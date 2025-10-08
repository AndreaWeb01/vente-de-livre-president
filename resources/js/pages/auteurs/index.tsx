import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Heading from '@/components/heading';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestion des auteurs',
    href: '/auteurs',
  },
];

interface Livre {
  id: number;
  titre: string;
  prix: number;
}

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  ville?: string;
  quartier?: string;
}

interface Auteur {
  id: number;
  user_id: number;
  biographie?: string;
  user: User;
  livres: Livre[];
  photo?: string;
}

interface Props {
  auteurs: Auteur[];
}

export default function IndexAuteurs({ auteurs }: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet auteur ?')) {
      setDeletingId(id);
      router.delete(`/auteurs/${id}`, {
        onFinish: () => setDeletingId(null),
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <AppShell>
      <Head title="Gestion des auteurs" />

      <div className="container py-10">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <Heading
            title="Gestion des auteurs"
            className="text-3xl font-bold text-orange-600"
          />
          <Link href="/auteurs/create">
            <Button className="bg-orange-600 hover:bg-green-600 text-white">
              Ajouter un auteur
            </Button>
          </Link>
        </div>

        {/* Si aucun auteur */}
        {auteurs.length === 0 ? (
          <Card className="p-8 text-center border border-green-200 bg-white shadow-sm">
            <div className="text-gray-600">
              <p className="text-lg mb-4">Aucun auteur trouvé</p>
              <p className="mb-4">Commencez par ajouter votre premier auteur.</p>
              <Link href="/auteurs/create">
                <Button className="bg-orange-600 hover:bg-green-600 text-white">
                  Ajouter un auteur
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          /* Liste des auteurs */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auteurs.map((auteur) => (
              <Card
                key={auteur.id}
                className="overflow-hidden bg-white border border-green-200 hover:shadow-lg transition-shadow"
              >
                {auteur.photo && (
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={auteur.photo}
                      alt={`${auteur.user.prenom} ${auteur.user.nom}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-orange-700">
                    {auteur.user.prenom} {auteur.user.nom}
                  </h3>

                  <p className="text-sm text-gray-500 mb-2">
                    ✉️ {auteur.user.email}
                  </p>

                  {auteur.user.ville && (
                    <p className="text-sm text-gray-500 mb-2">
                      🏙️ {auteur.user.ville}
                    </p>
                  )}

                  {auteur.biographie && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {auteur.biographie}
                    </p>
                  )}

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      📚 {auteur.livres.length} livre(s)
                    </span>
                    {auteur.user.telephone && (
                      <span className="text-orange-600 font-medium">
                        📞 {auteur.user.telephone}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/auteurs/${auteur.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
                      >
                        Voir
                      </Button>
                    </Link>
                    <Link href={`/auteurs/${auteur.id}/edit`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-green-500 text-green-600 hover:bg-green-50"
                      >
                        Modifier
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(auteur.id)}
                      disabled={deletingId === auteur.id}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      {deletingId === auteur.id ? 'Suppression...' : 'Supprimer'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
    </AppLayout>
  );
}
