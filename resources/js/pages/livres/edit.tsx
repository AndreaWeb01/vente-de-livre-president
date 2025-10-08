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
  date_publication: string;
  prix: number;
  stock: number;
  est_actif: boolean;
  auteur: Auteur;
}

interface Props {
  livre: Livre;
  auteurs: Auteur[];
}

export default function EditLivre({ livre, auteurs }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    titre: livre.titre,
    auteur_id: livre.auteur_id.toString(),
    description: livre.description,
    page: livre.page.toString(),
    type: livre.type,
    langue: livre.langue,
    photo: null as File | null,
    livrepdf: null as File | null,
    date_publication: livre.date_publication,
    prix: livre.prix.toString(),
    stock: livre.stock.toString(),
    est_actif: livre.est_actif,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Utiliser directement les données du formulaire
    put(`/livres/${livre.id}`);
  };

  const livreTypes = [
    { value: 'physique', label: 'Physique' },
    { value: 'numerique', label: 'Numérique' },

  ];

  const langues = [
    'Français',
    'Anglais',
    'Espagnol',
    'Allemand',
    'Italien',
    'Portugais',
    'Arabe',
    'Chinois',
    'Japonais',
    'Russe',
    'Autre',
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AppShell>
        <Head title="Modifier le livre" />

        <div className="container py-10">
          <Heading title={`Modifier ${livre.titre}`} />

          <Card className="mt-6 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="titre">Titre *</Label>
                  <Input
                    id="titre"
                    value={data.titre}
                    onChange={(e) => setData('titre', e.target.value)}
                    placeholder="Titre du livre"
                  />
                  {errors.titre && <InputError message={errors.titre} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auteur_id">Auteur *</Label>
                  <Select value={data.auteur_id} onValueChange={(value) => setData('auteur_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un auteur" />
                    </SelectTrigger>
                    <SelectContent>
                      {auteurs.map((auteur) => (
                        <SelectItem key={auteur.id} value={auteur.id.toString()}>
                          {auteur.user.prenom} {auteur.user.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.auteur_id && <InputError message={errors.auteur_id} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {livreTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && <InputError message={errors.type} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="langue">Langue *</Label>
                  <Select value={data.langue} onValueChange={(value) => setData('langue', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      {langues.map((langue) => (
                        <SelectItem key={langue} value={langue}>
                          {langue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.langue && <InputError message={errors.langue} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="page">Nombre de pages *</Label>
                  <Input
                    id="page"
                    type="number"
                    value={data.page}
                    onChange={(e) => setData('page', e.target.value)}
                    placeholder="200"
                  />
                  {errors.page && <InputError message={errors.page} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prix">Prix (FCFA) *</Label>
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
                  <Label htmlFor="stock">Stock *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={data.stock}
                    onChange={(e) => setData('stock', e.target.value)}
                    placeholder="50"
                  />
                  {errors.stock && <InputError message={errors.stock} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_publication">Date de publication *</Label>
                  <Input
                    id="date_publication"
                    type="date"
                    value={data.date_publication}
                    onChange={(e) => setData('date_publication', e.target.value)}
                  />
                  {errors.date_publication && <InputError message={errors.date_publication} />}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Photo de couverture</Label>
                {livre.photo && (
                  <div className="mb-2">
                    <img
                      src={`/storage/${livre.photo}`}
                      alt="Photo actuelle"
                      className="w-32 h-48 object-cover rounded border"
                    />
                    <p className="text-sm text-muted-foreground mt-1">Photo actuelle</p>
                  </div>
                )}
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setData('photo', file);
                    }
                  }}
                />
                {errors.photo && <InputError message={errors.photo} />}
                <p className="text-sm text-muted-foreground">
                  Formats acceptés: JPEG, PNG, JPG, GIF (max 2MB)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="livrepdf">PDF du livre (optionnel)</Label>
                {livre.livrepdf && (
                  <div className="mb-2">
                    <a
                      href={`/storage/${livre.livrepdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      📄 Voir le PDF actuel
                    </a>
                  </div>
                )}
                <Input
                  id="livrepdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setData('livrepdf', file);
                    }
                  }}
                />
                {errors.livrepdf && <InputError message={errors.livrepdf} />}
                <p className="text-sm text-muted-foreground">
                  Format accepté: PDF (max 10MB)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  rows={6}
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  placeholder="Description détaillée du livre..."
                />
                {errors.description && <InputError message={errors.description} />}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="est_actif"
                  checked={data.est_actif}
                  onCheckedChange={(checked) => setData('est_actif', checked as boolean)}
                />
                <Label htmlFor="est_actif">Livre disponible</Label>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                  Annuler
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Modification en cours...' : 'Modifier le livre'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </AppShell>
    </AppLayout>
  );
}
