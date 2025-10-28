import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';
import { UserRoleBadge } from '@/components/user-role-badge';

export function UserInfo({
    user,
    showEmail = false,
    showRole = false,
}: {
    user: User | null;
    showEmail?: boolean;
    showRole?: boolean;
}) {
    const getInitials = useInitials();

    // Si l'utilisateur n'est pas connecté, afficher un bouton de connexion
    if (!user) {
        return (
            <div className="flex items-center gap-2 w-full">
                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        👤
                    </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Non connecté</span>
                    <span className="truncate text-xs text-muted-foreground">
                        Se connecter
                    </span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
                {showRole && (
                    <div className="mt-1">
                        <UserRoleBadge user={user} />
                    </div>
                )}
            </div>
        </>
    );
}
