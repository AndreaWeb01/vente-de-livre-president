import { ReactNode } from 'react';
import { AppShell } from '@/components/app-shell';
import { PublicSidebar } from '@/components/public-sidebar';
import { BreadcrumbItem } from '@/types';

interface PublicLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PublicLayout({ children, breadcrumbs }: PublicLayoutProps) {
  return (
    <AppShell sidebar={<PublicSidebar />} breadcrumbs={breadcrumbs}>
      {children}
    </AppShell>
  );
}
