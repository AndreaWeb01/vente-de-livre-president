import { Badge } from '@/components/ui/badge';
import { type User } from '@/types';

interface UserRoleBadgeProps {
  user: User;
}

export function UserRoleBadge({ user }: UserRoleBadgeProps) {
  // Déterminer le rôle principal de l'utilisateur
  const getPrimaryRole = () => {
    if (user.roles?.includes('admin')) return 'admin';
    if (user.roles?.includes('editor')) return 'editor';
    return 'user';
  };

  const primaryRole = getPrimaryRole();

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'admin':
        return {
          label: 'Administrateur',
          className: 'bg-red-100 text-red-700 border border-red-300'
        };
      case 'editor':
        return {
          label: 'Éditeur',
          className: 'bg-blue-100 text-blue-700 border border-blue-300'
        };
      default:
        return {
          label: 'Utilisateur',
          className: 'bg-gray-100 text-gray-700 border border-gray-300'
        };
    }
  };

  const roleConfig = getRoleConfig(primaryRole);

  return (
    <Badge className={roleConfig.className}>
      {roleConfig.label}
    </Badge>
  );
}
