import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Heading from '@/components/heading';
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
  date_publication: string;
  est_actif: boolean;
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
  biographie: string;
  user: User;
  livres: Livre[];
}

interface Props {
  auteur: Auteur;
}

export default function ShowAuteur({ auteur }: Props) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <AppShell>
      <Head title={`${auteur.user.prenom} ${auteur.user.nom}`} />

      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <Heading title={`${auteur.user.prenom} ${auteur.user.nom}`} />
          <div className="flex gap-2">
            <Link href={`/auteurs/${auteur.id}/edit`}>
              <Button variant="outline">Modifier</Button>
            </Link>
            <Link href="/auteurs">
              <Button variant="outline">Retour à la liste</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informations de l'auteur */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Informations de l'auteur</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Nom complet</span>
                <p className="text-lg">{auteur.user.prenom} {auteur.user.nom}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-muted-foreground">Email</span>
                <p className="text-lg">{auteur.user.email}</p>
              </div>

              {auteur.user.telephone && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Téléphone</span>
                  <p className="text-lg">{auteur.user.telephone}</p>
                </div>
              )}

              {(auteur.user.ville || auteur.user.quartier) && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Localisation</span>
                  <p className="text-lg">
                    {auteur.user.ville && auteur.user.quartier
                      ? `${auteur.user.ville}, ${auteur.user.quartier}`
                      : auteur.user.ville || auteur.user.quartier
                    }
                  </p>
                </div>
              )}

              <div>
                <span className="text-sm font-medium text-muted-foreground">Biographie</span>
                <p className="text-lg mt-2 whitespace-pre-wrap">{auteur.biographie}</p>
              </div>
            </div>
          </Card>

          {/* Livres de l'auteur */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Livres ({auteur.livres.length})</h3>

            {auteur.livres.length === 0 ? (
              <p className="text-muted-foreground">Aucun livre publié pour le moment.</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {auteur.livres.map((livre) => (
                  <div key={livre.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{livre.titre}</h4>
                        <p className="text-sm text-muted-foreground">
                          Publié le {formatDate(livre.date_publication)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">
                          {formatPrice(livre.prix)}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          livre.est_actif
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {livre.est_actif ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </AppShell>
    </AppLayout>
  );
}
