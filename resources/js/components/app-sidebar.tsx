
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookAIcon, BookOpen, LayoutGrid, ShoppingBag, Library, UserCheck } from 'lucide-react';
import AppLogo from './app-logo';
import { useTranslation } from "react-i18next";

const buildMainNavItems = (t: (k: string) => string): NavItem[] => [
    { title: t('nav.dashboard'), href: '/admin/dashboard', icon: LayoutGrid },
    { title: t('common.trainings'), href: '/admin/formations', icon: BookOpen },
    { title: t('common.books'), href: '/admin/livres', icon: BookAIcon },
    { title: t('nav.orders'), href: '/admin/commandes', icon: ShoppingBag },
    { title: t('nav.users'), href: '/admin/users', icon: Library },
    { title: t('nav.authors'), href: '/admin/auteurs', icon: UserCheck },
];



export function AppSidebar() {
    const { t } = useTranslation();
    const mainNavItems = buildMainNavItems(t);
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={'/admin/dashboard'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
