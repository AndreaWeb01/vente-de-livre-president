import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { useState } from 'react';

interface Role {
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
}

interface Props {
  users: User[];
  roles: Role[];
}

export default function IndexUsers({ users, roles }: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setDeletingId(id);
      router.delete(`/users/${id}`, {
        onFinish: () => setDeletingId(null),
      });
    }
  };

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
      <Head title="Gestion des utilisateurs" />

      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <Heading title="Gestion des utilisateurs" />
          <Link href="/users/create">
            <Button>Ajouter un utilisateur</Button>
          </Link>
        </div>

        {users.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground">
              <p className="text-lg mb-4">Aucun utilisateur trouvé</p>
              <p className="mb-4">Commencez par ajouter votre premier utilisateur.</p>
              <Link href="/users/create">
                <Button>Ajouter un utilisateur</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        {user.prenom} {user.nom}
                      </h3>
                      <div className="flex gap-1">
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

                    <p className="text-muted-foreground mb-2">{user.email}</p>

                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {user.telephone && <span>📞 {user.telephone}</span>}
                      {user.ville && <span>🏙️ {user.ville}</span>}
                      {user.quartier && <span>📍 {user.quartier}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/users/${user.id}`}>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                    </Link>
                    <Link href={`/users/${user.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId === user.id}
                    >
                      {deletingId === user.id ? 'Suppression...' : 'Supprimer'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
