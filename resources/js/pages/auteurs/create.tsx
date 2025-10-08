import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

interface Props {
  users: User[];
}

export default function CreateAuteur({ users }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    biographie: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/auteurs');
  };

  return (
    <AppShell>
      <Head title="Créer un auteur" />

      <div className="container py-10">
        <Heading title="Créer un nouvel auteur" />

        <Card className="mt-6 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user_id">Utilisateur *</Label>
                <Select value={data.user_id} onValueChange={(value) => setData('user_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un utilisateur" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.prenom} {user.nom} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.user_id && <InputError message={errors.user_id} />}
                <p className="text-sm text-muted-foreground">
                  Sélectionnez un utilisateur existant pour en faire un auteur. Seuls les utilisateurs qui ne sont pas déjà auteurs sont affichés.
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
                {processing ? 'Création en cours...' : 'Créer l\'auteur'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
