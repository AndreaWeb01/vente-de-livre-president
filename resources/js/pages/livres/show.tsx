import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestion des livres',
    href: '/livres',
  },
];

interface Auteur {
  id: number;
  user_id: number;
  biographie: string;
  user: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
  };
}

interface Livre {
  id: number;
  auteur_id: number;
  titre: string;
  description: string;
  page: number;
  type: string;
  langue: string;
  photo: string;
  livrepdf?: string;
  date_publication: string;
  prix: number;
  stock: number;
  est_actif: boolean;
  auteur: Auteur;
}

interface Props {
  livre: Livre;
}

export default function ShowLivre({ livre }: Props) {
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
      case 'roman':
        return 'default';
      case 'essai':
        return 'secondary';
      case 'manuel':
        return 'outline';
      case 'biographie':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AppShell>
        <Head title={livre.titre} />

        <div className="container py-10">
          <div className="flex justify-between items-center mb-6">
            <Heading title={livre.titre} />
            <div className="flex gap-2">
              <Link href={`/livres/${livre.id}/edit`}>
                <Button variant="outline">Modifier</Button>
              </Link>
              <Link href="/livres">
                <Button variant="outline">Retour à la liste</Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image et informations principales */}
            <div className="lg:col-span-2">
              <Card className="p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={livre.photo.startsWith('http') ? livre.photo : `/storage/${livre.photo}`}
                      alt={livre.titre}
                      className="w-full md:w-64 h-80 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-book.jpg';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">{livre.titre}</h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-muted-foreground">Auteur:</span>
                        <span className="text-lg">{livre.auteur.user.prenom} {livre.auteur.user.nom}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-medium text-muted-foreground">Type:</span>
                        <Badge variant={getTypeBadgeVariant(livre.type)}>
                          {livre.type}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-medium text-muted-foreground">Langue:</span>
                        <span className="text-lg">{livre.langue}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-medium text-muted-foreground">Pages:</span>
                        <span className="text-lg">{livre.page}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-medium text-muted-foreground">Date de publication:</span>
                        <span className="text-lg">{formatDate(livre.date_publication)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-medium text-muted-foreground">Stock:</span>
                        <span className={`text-lg font-bold ${livre.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {livre.stock} exemplaire{livre.stock > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary mb-2">
                        {formatPrice(livre.prix)}
                      </p>
                      <Badge variant={livre.est_actif ? "default" : "secondary"}>
                        {livre.est_actif ? "Disponible" : "Indisponible"}
                      </Badge>

                      {livre.livrepdf && (
                        <div className="mt-4">
                          <a
                            href={livre.livrepdf.startsWith('http') ? livre.livrepdf : `/storage/${livre.livrepdf}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            📖 Télécharger le PDF
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {livre.description}
                </p>
              </Card>
            </div>

            {/* Informations secondaires */}
            <div>
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Auteur</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-lg">
                      {livre.auteur.user.prenom} {livre.auteur.user.nom}
                    </p>
                    <p className="text-sm text-muted-foreground">{livre.auteur.user.email}</p>
                  </div>

                  {livre.auteur.biographie && (
                    <div>
                      <h4 className="font-medium mb-2">Biographie</h4>
                      <p className="text-sm text-muted-foreground">
                        {livre.auteur.biographie}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Détails du livre</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ISBN:</span>
                    <span className="font-mono text-sm">978-2-123456-78-9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format:</span>
                    <span>Papier</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span>14 x 21 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Poids:</span>
                    <span>~300g</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </AppShell>
    </AppLayout>
  );
}
