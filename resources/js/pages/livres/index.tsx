import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestion des livres',
    href: '/livres',
  },

];
interface Livre {
  id: number;
  titre: string;
  auteur_id: number;
  description: string;
  page: number;
  type: string;
  langue: string;
  photo: string;
  date_publication: string;
  prix: number;
  stock: number;
  est_actif: boolean;
  auteur?: {
    id: number;
    nom: string;
    prenom: string;
  };
}

interface Props {
  livres: Livre[];
}

export default function IndexLivres({ livres }: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      setDeletingId(id);
      router.delete(`/livres/${id}`, {
        onFinish: () => setDeletingId(null),
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'FCFA',
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <AppShell>
      <Head title="Liste des livres" />

      <div className="container py-10">
        {/* Header */}

          <Link href="/livres/create">
            <Button className="bg-orange-600 hover:bg-green-600 text-white float-end">
              Ajouter un livre
            </Button>
          </Link>
        </div>
        {/* Aucun livre */}
        {livres.length === 0 ? (
          <Card className="p-8 text-center border border-green-200 bg-white shadow-sm">
            <div className="text-gray-600">
              <p className="text-lg mb-4">Aucun livre trouvé</p>
              <p className="mb-4">Commencez par ajouter votre premier livre.</p>
              <Link href="/livres/create">
                <Button className="bg-orange-600 hover:bg-green-600 text-white">
                  Ajouter un livre
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {livres.map((livre) => (
              <Card
                key={livre.id}
                className="overflow-hidden bg-white border border-green-200 hover:shadow-lg transition-shadow"
              >
                {livre.photo && (
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={livre.photo}
                      alt={livre.titre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2 text-orange-700">
                      {livre.titre}
                    </h3>
                    <Badge
                      className={`${
                        livre.est_actif
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : 'bg-orange-100 text-orange-700 border border-orange-300'
                      }`}
                    >
                      {livre.est_actif ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                  {livre.auteur && (
                    <p className="text-sm text-gray-600 mb-2">
                      ✍️ {livre.auteur.prenom} {livre.auteur.nom}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {livre.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span> {livre.page} pages</span>
                    <span className="text-green-700 font-medium">{livre.type}</span>
                    <span className="text-orange-700 font-medium">{livre.langue}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-lg font-bold text-orange-700">
                        {formatPrice(livre.prix)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Stock :{' '}
                        <span
                          className={`font-semibold ${
                            livre.stock > 0
                              ? 'text-green-700'
                              : 'text-red-600'
                          }`}
                        >
                          {livre.stock}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(livre.date_publication)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/livres/${livre.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
                      >
                        Voir
                      </Button>
                    </Link>
                    <Link href={`/livres/${livre.id}/edit`} className="flex-1">
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
                      onClick={() => handleDelete(livre.id)}
                      disabled={deletingId === livre.id}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      {deletingId === livre.id ? 'Suppression...' : 'Supprimer'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </AppShell>
      </AppLayout>
  );
}
