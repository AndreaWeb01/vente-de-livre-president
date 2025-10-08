import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

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
  formation: Formation;
}

export default function ShowFormation({ formation }: Props) {
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
    <AppShell>
      <Head title={formation.titre} />

      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <Heading title={formation.titre} />
          <div className="flex gap-2">
            <Link href={`/formations/${formation.id}/edit`}>
              <Button variant="outline">Modifier</Button>
            </Link>
            <Link href="/formations">
              <Button variant="outline">Retour à la liste</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={formation.image.startsWith('http') ? formation.image : `/storage/${formation.image}`}
                    alt={formation.titre}
                    className="w-full md:w-64 h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-formation.jpg';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">{formation.titre}</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{formation.description}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Détails de la formation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Formateur</span>
                  <p className="text-lg">{formation.formateur}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-muted-foreground">Domaine</span>
                  <p className="text-lg">{formation.domaine}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-muted-foreground">Type</span>
                  <div className="mt-1">
                    <Badge variant={getTypeBadgeVariant(formation.type)}>
                      {formation.type}
                    </Badge>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-muted-foreground">Date</span>
                  <p className="text-lg">{formatDate(formation.date)}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Informations secondaires */}
          <div>
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Prix</h3>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">
                  {formatPrice(formation.prix)}
                </p>
                <Badge variant={formation.est_actif ? "default" : "secondary"}>
                  {formation.est_actif ? "Formation active" : "Formation inactive"}
                </Badge>
              </div>
            </Card>

            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Ressources</h3>
              <div className="space-y-3">
                {formation.url_video && (
                  <div>
                    <a
                      href={formation.url_video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors w-full justify-center"
                    >
                      🎥 Voir la vidéo
                    </a>
                  </div>
                )}

                {formation.url_zoom && (
                  <div>
                    <a
                      href={formation.url_zoom.startsWith('http') ? formation.url_zoom : `/storage/${formation.url_zoom}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full justify-center"
                    >
                      📄 Télécharger le PDF
                    </a>
                  </div>
                )}

                {!formation.url_video && !formation.url_zoom && (
                  <p className="text-sm text-muted-foreground text-center">
                    Aucune ressource disponible
                  </p>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Créateur</h3>
              <div className="space-y-2">
                <p className="font-medium">{formation.user.prenom} {formation.user.nom}</p>
                <p className="text-sm text-muted-foreground">{formation.user.email}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
