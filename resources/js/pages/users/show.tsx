import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';

interface Role {
  id: number;
  name: string;
}

interface Permission {
  id: number;
  name: string;
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
  roles: Role[];
  permissions: Permission[];
}

interface Props {
  user: User;
  roles: Role[];
  permissions: Permission[];
}

export default function ShowUser({ user, roles, permissions }: Props) {
  const getRoleBadgeVariant = (roleName: string) => {
    switch (roleName) {
      case 'admin':
        return 'destructive';
      case 'editor':
        return 'default';
      case 'user':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <AppShell>
      <Head title={`${user.prenom} ${user.nom}`} />

      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <Heading title={`${user.prenom} ${user.nom}`} />
          <div className="flex gap-2">
            <Link href={`/users/${user.id}/edit`}>
              <Button variant="outline">Modifier</Button>
            </Link>
            <Link href="/users">
              <Button variant="outline">Retour à la liste</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informations personnelles */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Nom complet</span>
                <p className="text-lg">{user.prenom} {user.nom}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-muted-foreground">Email</span>
                <p className="text-lg">{user.email}</p>
              </div>

              {user.telephone && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Téléphone</span>
                  <p className="text-lg">{user.telephone}</p>
                </div>
              )}

              {user.adresse && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Adresse</span>
                  <p className="text-lg">{user.adresse}</p>
                </div>
              )}

              {(user.ville || user.quartier) && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Localisation</span>
                  <p className="text-lg">
                    {user.ville && user.quartier
                      ? `${user.ville}, ${user.quartier}`
                      : user.ville || user.quartier
                    }
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Rôles et permissions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Rôles et permissions</h3>

            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Rôles</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.roles.map((role) => (
                    <Badge
                      key={role.id}
                      variant={getRoleBadgeVariant(role.name)}
                    >
                      {role.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Permissions ({user.permissions.length})
                </span>
                <div className="mt-2 max-h-40 overflow-y-auto">
                  <div className="grid grid-cols-1 gap-1">
                    {user.permissions.map((permission) => (
                      <div key={permission.id} className="text-sm text-muted-foreground">
                        • {permission.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
