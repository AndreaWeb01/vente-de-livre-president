import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

interface Role {
  id: number;
  name: string;
}

interface Props {
  roles: Role[];
}

export default function CreateUser({ roles }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    quartier: '',
    password: '',
    password_confirmation: '',
    roles: [] as number[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/users');
  };

  const handleRoleChange = (roleId: number, checked: boolean) => {
    if (checked) {
      setData('roles', [...data.roles, roleId]);
    } else {
      setData('roles', data.roles.filter(id => id !== roleId));
    }
  };

  return (
    <AppShell>
      <Head title="Créer un utilisateur" />

      <div className="container py-10">
        <Heading title="Créer un nouvel utilisateur" />

        <Card className="mt-6 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  value={data.nom}
                  onChange={(e) => setData('nom', e.target.value)}
                  placeholder="Nom de famille"
                />
                {errors.nom && <InputError message={errors.nom} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom *</Label>
                <Input
                  id="prenom"
                  value={data.prenom}
                  onChange={(e) => setData('prenom', e.target.value)}
                  placeholder="Prénom"
                />
                {errors.prenom && <InputError message={errors.prenom} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="adresse@email.com"
                />
                {errors.email && <InputError message={errors.email} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  value={data.telephone}
                  onChange={(e) => setData('telephone', e.target.value)}
                  placeholder="+33 1 23 45 67 89"
                />
                {errors.telephone && <InputError message={errors.telephone} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  value={data.adresse}
                  onChange={(e) => setData('adresse', e.target.value)}
                  placeholder="123 Rue de la Paix"
                />
                {errors.adresse && <InputError message={errors.adresse} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ville">Ville</Label>
                <Input
                  id="ville"
                  value={data.ville}
                  onChange={(e) => setData('ville', e.target.value)}
                  placeholder="Paris"
                />
                {errors.ville && <InputError message={errors.ville} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="quartier">Quartier</Label>
                <Input
                  id="quartier"
                  value={data.quartier}
                  onChange={(e) => setData('quartier', e.target.value)}
                  placeholder="Centre-ville"
                />
                {errors.quartier && <InputError message={errors.quartier} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="Mot de passe"
                />
                {errors.password && <InputError message={errors.password} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirmer le mot de passe *</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  placeholder="Confirmer le mot de passe"
                />
                {errors.password_confirmation && <InputError message={errors.password_confirmation} />}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Rôles</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role.id}`}
                      checked={data.roles.includes(role.id)}
                      onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                    />
                    <Label htmlFor={`role-${role.id}`} className="capitalize">
                      {role.name}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.roles && <InputError message={errors.roles} />}
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Annuler
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? 'Création en cours...' : 'Créer l\'utilisateur'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
