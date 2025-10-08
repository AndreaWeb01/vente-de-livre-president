import AuthLayoutTemplate from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({
    children,
    title,
    description,
    leftTitle,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
    leftTitle?: string;
}) {
    return (
        <AuthLayoutTemplate title={title} description={description} leftTitle={leftTitle} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
