import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestion des formations',
    href: '/formations',
  },
];

interface Formation {
  id: number;
  user_id: number;
  titre: string;
  type: string;
  formateur: string;
  description: string;
  domaine: string;
  date: string;
  image: string;
  url_video?: string;
  url_zoom?: string;
  est_actif: boolean;
  prix: number;
  user: User;
}

interface Props {
  formations: Formation[];
}

export default function IndexFormations({ formations }: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      setDeletingId(id);
      router.delete(`/formations/${id}`, {
        onFinish: () => setDeletingId(null),
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case 'présentiel':
        return 'default';
      case 'en ligne':
        return 'secondary';
      case 'hybride':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <AppShell>
      <Head title="Liste des formations" />

      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <Heading title="Liste des formations" />
          <Link href="/formations/create">
            <Button>Ajouter une formation</Button>
          </Link>
        </div>

        {formations.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground">
              <p className="text-lg mb-4">Aucune formation trouvée</p>
              <p className="mb-4">Commencez par ajouter votre première formation.</p>
              <Link href="/formations/create">
                <Button>Ajouter une formation</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((formation) => (
              <Card key={formation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={formation.image.startsWith('http') ? formation.image : `/storage/${formation.image}`}
                    alt={formation.titre}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-formation.jpg';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={formation.est_actif ? "default" : "secondary"}>
                      {formation.est_actif ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg line-clamp-2">{formation.titre}</h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Formateur:</span>
                      <span className="text-sm">{formation.formateur}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Domaine:</span>
                      <span className="text-sm">{formation.domaine}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Type:</span>
                      <Badge variant={getTypeBadgeVariant(formation.type)}>
                        {formation.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Date:</span>
                      <span className="text-sm">{formatDate(formation.date)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {formation.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(formation.prix)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Créé par {formation.user.prenom} {formation.user.nom}
                      </p>
                    </div>
                  </div>

                  {/* Indicateurs de ressources */}
                  <div className="flex gap-2 mb-4">
                    {formation.url_video && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                        🎥 Vidéo
                      </span>
                    )}
                    {formation.url_zoom && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        📄 PDF
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/formations/${formation.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Voir
                      </Button>
                    </Link>
                    <Link href={`/formations/${formation.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Modifier
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(formation.id)}
                      disabled={deletingId === formation.id}
                      className="flex-1"
                    >
                      {deletingId === formation.id ? 'Suppression...' : 'Supprimer'}
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
