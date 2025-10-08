import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestion des formations',
    href: '/formations',
  },
];

export default function CreateFormation() {
  const { data, setData, post, processing, errors } = useForm({
    titre: '',
    type: '',
    formateur: '',
    description: '',
    domaine: '',
    date: '',
    image: null as File | null,
    url_video: '',
    url_zoom: null as File | null,
    prix: '',
    est_actif: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/formations');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <AppShell>
      <Head title="Créer une formation" />

      <div className="container py-10">
        <Heading title="Créer une nouvelle formation" />

        <Card className="mt-6 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="titre">Titre</Label>
                <Input
                  id="titre"
                  value={data.titre}
                  onChange={(e) => setData('titre', e.target.value)}
                />
                {errors.titre && <InputError message={errors.titre} />}
              </div>


              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  value={data.type}
                  onChange={(e) => setData('type', e.target.value)}
                />
                {errors.type && <InputError message={errors.type} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="formateur">Formateur</Label>
                <Input
                  id="formateur"
                  value={data.formateur}
                  onChange={(e) => setData('formateur', e.target.value)}
                />
                {errors.formateur && <InputError message={errors.formateur} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="domaine">Domaine</Label>
                <Input
                  id="domaine"
                  value={data.domaine}
                  onChange={(e) => setData('domaine', e.target.value)}
                />
                {errors.domaine && <InputError message={errors.domaine} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={data.date}
                  onChange={(e) => setData('date', e.target.value)}
                />
                {errors.date && <InputError message={errors.date} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="prix">Prix (FCFA)</Label>
                <Input
                  id="prix"
                  type="number"
                  step="0.01"
                  min="0"
                  max="999999.99"
                  value={data.prix}
                  onChange={(e) => setData('prix', e.target.value)}
                  placeholder="0.00"
                />
                {errors.prix && <InputError message={errors.prix} />}
                <p className="text-sm text-muted-foreground">
                  Prix maximum : 999 999,99 FCFA
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image de la formation *</Label>
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
              <Label htmlFor="description">Description</Label>
              <textarea
                title="Description"
                placeholder="Entrez une description détaillée de la formation"
                id="description"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={4}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              />
              {errors.description && <InputError message={errors.description} />}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="est_actif"
                checked={data.est_actif}
                onCheckedChange={(checked) => setData('est_actif', checked as boolean)}
              />
              <Label htmlFor="est_actif">Actif</Label>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={processing}>
                {processing ? 'Création en cours...' : 'Créer la formation'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
    </AppLayout>
  );
}
