import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

interface Auteur {
  id: number;
  user_id: number;
  biographie: string;
  user: User;
}

interface Props {
  auteur: Auteur;
}

export default function EditAuteur({ auteur }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    biographie: auteur.biographie,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/auteurs/${auteur.id}`);
  };

  return (
    <AppShell>
      <Head title="Modifier l'auteur" />

      <div className="container py-10">
        <Heading title={`Modifier ${auteur.user.prenom} ${auteur.user.nom}`} />

        <Card className="mt-6 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Utilisateur</Label>
                <div className="p-3 bg-muted rounded-md">
                  <p className="font-medium">{auteur.user.prenom} {auteur.user.nom}</p>
                  <p className="text-sm text-muted-foreground">{auteur.user.email}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  L'utilisateur associé à cet auteur ne peut pas être modifié.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="biographie">Biographie *</Label>
                <textarea
                  id="biographie"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  rows={6}
                  value={data.biographie}
                  onChange={(e) => setData('biographie', e.target.value)}
                  placeholder="Biographie de l'auteur..."
                />
                {errors.biographie && <InputError message={errors.biographie} />}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Annuler
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? 'Modification en cours...' : 'Modifier l\'auteur'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
