import { type PropsWithChildren } from 'react';

interface AuthSplitLayoutProps {
    title?: string;
    description?: string;
    leftTitle?: string;
}

export default function AuthSplitLayout({
    children,
    title,
    description,
    leftTitle = "INSCRIPTION",
}: PropsWithChildren<AuthSplitLayoutProps>) {
    return (
        <div className="min-h-screen flex">
            {/* Colonne gauche verte */}
            <div className="hidden lg:flex lg:w-2/5 bg-green-600 items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-white font-serif">
                        {leftTitle}
                    </h1>
                </div>
            </div>

            {/* Colonne droite avec le formulaire */}
            <div className="w-full lg:w-3/5 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-black font-serif">
                                {title || "Je vous rejoins"}
                            </h2>
                            {description && (
                                <p className="text-muted-foreground">
                                    {description}
                                </p>
                            )}
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
