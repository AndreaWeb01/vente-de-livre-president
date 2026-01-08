import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { AdminNavUser } from '@/components/admin-nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookAIcon,
    BookOpen,
    LayoutGrid,
    Users,
    UserCheck,
    Settings,
    BarChart3,
    ShoppingBag,
    Library
} from 'lucide-react';
import AppLogo from './app-logo';
import { useTranslation } from "react-i18next";

const buildMainNavItems = (t: (k: string) => string): NavItem[] => [
    { title: t('nav.adminDashboard'), href: '/admin/dashboard', icon: LayoutGrid },
    { title: t('common.trainings'), href: '/admin/formations', icon: BookOpen },
    { title: t('common.books'), href: '/admin/livres', icon: BookAIcon },
    { title: t('nav.orders'), href: '/admin/commandes', icon: ShoppingBag },
    { title: t('nav.users'), href: '/admin/users', icon: Users },
    { title: t('nav.authors'), href: '/admin/auteurs', icon: UserCheck },
    { title: t('nav.statistics'), href: '/admin/statistics', icon: BarChart3 },
    { title: t('nav.myTrainings'), href: '/mes-formations', icon: ShoppingBag },
    { title: t('nav.myBooks'), href: '/mes-livres', icon: Library },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/shadcn-ui/shadcn-ui',
        icon: 'github',
        external: true,
    },
    {
        title: 'Support',
        href: '/support',
        icon: 'life-ring',
    },
];

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { t } = useTranslation();
    const mainNavItems = buildMainNavItems(t);
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <AppLogo className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{t('nav.adminPanel')}</span>
                                    <span className="truncate text-xs">{t('nav.siteManagement')}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavFooter items={footerNavItems} />
                <AdminNavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
