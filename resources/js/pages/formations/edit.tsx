import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

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
}

interface Props {
  formation: Formation;
}

export default function EditFormation({ formation }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    titre: formation.titre,
    type: formation.type,
    formateur: formation.formateur,
    description: formation.description,
    domaine: formation.domaine,
    date: formation.date,
    image: null as File | null,
    url_video: formation.url_video || '',
    url_zoom: null as File | null,
    est_actif: formation.est_actif,
    prix: formation.prix.toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Utiliser directement les données du formulaire
    put(`/formations/${formation.id}`);
  };

  const formationTypes = [
    { value: 'Présentiel', label: 'Présentiel' },
    { value: 'En ligne', label: 'En ligne' },
    { value: 'Hybride', label: 'Hybride' },
  ];

  const domaines = [
    'Développement Web',
    'Développement Mobile',
    'Data Science',
    'Intelligence Artificielle',
    'Cybersécurité',
    'Design UX/UI',
    'Marketing Digital',
    'Management',
    'Finance',
    'Ressources Humaines',
    'Sécurité',
    'Autre',
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <AppShell>
      <Head title="Modifier la formation" />

      <div className="container py-10">
        <Heading title={`Modifier ${formation.titre}`} />

        <Card className="mt-6 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="titre">Titre *</Label>
                <Input
                  id="titre"
                  value={data.titre}
                  onChange={(e) => setData('titre', e.target.value)}
                  placeholder="Titre de la formation"
                />
                {errors.titre && <InputError message={errors.titre} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="formateur">Formateur *</Label>
                <Input
                  id="formateur"
                  value={data.formateur}
                  onChange={(e) => setData('formateur', e.target.value)}
                  placeholder="Nom du formateur"
                />
                {errors.formateur && <InputError message={errors.formateur} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type de formation *</Label>
                <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {formationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && <InputError message={errors.type} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="domaine">Domaine *</Label>
                <Select value={data.domaine} onValueChange={(value) => setData('domaine', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un domaine" />
                  </SelectTrigger>
                  <SelectContent>
                    {domaines.map((domaine) => (
                      <SelectItem key={domaine} value={domaine}>
                        {domaine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.domaine && <InputError message={errors.domaine} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date de la formation *</Label>
                <Input
                  id="date"
                  type="date"
                  value={data.date}
                  onChange={(e) => setData('date', e.target.value)}
                />
                {errors.date && <InputError message={errors.date} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="prix">Prix (€) *</Label>
                <Input
                  id="prix"
                  type="number"
                  step="0.01"
                  value={data.prix}
                  onChange={(e) => setData('prix', e.target.value)}
                  placeholder="0.00"
                />
                {errors.prix && <InputError message={errors.prix} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image de la formation</Label>
                {formation.image && (
                  <div className="mb-2">
                    <img
                      src={`/storage/${formation.image}`}
                      alt="Image actuelle"
                      className="w-32 h-24 object-cover rounded border"
                    />
                    <p className="text-sm text-muted-foreground mt-1">Image actuelle</p>
                  </div>
                )}
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setData('image', file);
                    }
                  }}
                />
                {errors.image && <InputError message={errors.image} />}
                <p className="text-sm text-muted-foreground">
                  Formats acceptés: JPEG, PNG, JPG, GIF (max 2MB)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url_video">URL de la vidéo (optionnel)</Label>
                <Input
                  id="url_video"
                  type="url"
                  value={data.url_video}
                  onChange={(e) => setData('url_video', e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
                {errors.url_video && <InputError message={errors.url_video} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="url_zoom">PDF de la formation (optionnel)</Label>
                {formation.url_zoom && (
                  <div className="mb-2">
                    <a
                      href={`/storage/${formation.url_zoom}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      📄 Voir le PDF actuel
                    </a>
                  </div>
                )}
                <Input
                  id="url_zoom"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setData('url_zoom', file);
                    }
                  }}
                />
                {errors.url_zoom && <InputError message={errors.url_zoom} />}
                <p className="text-sm text-muted-foreground">
                  Format accepté: PDF (max 10MB)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={6}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Description détaillée de la formation..."
              />
              {errors.description && <InputError message={errors.description} />}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="est_actif"
                checked={data.est_actif}
                onCheckedChange={(checked) => setData('est_actif', checked as boolean)}
              />
              <Label htmlFor="est_actif">Formation active</Label>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Annuler
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? 'Modification en cours...' : 'Modifier la formation'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
    </AppLayout>
  );
}
