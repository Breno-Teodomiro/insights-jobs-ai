"use client";

import Icons from "../global/icons";

export const AuthPlaceholder = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
            <Icons.icon width={64} height={64} className="mb-4" />
            <h2 className="text-xl font-semibold mb-2">Autenticação em manutenção</h2>
            <p className="text-muted-foreground max-w-xs">
                O sistema de login está sendo configurado. Volte em breve!
            </p>
        </div>
    );
};
