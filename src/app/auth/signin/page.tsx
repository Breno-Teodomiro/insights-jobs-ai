export const dynamic = 'force-dynamic';

import { AuthPlaceholder } from "@/components/auth/auth-placeholder";
import { Suspense } from "react";

// Import dinâmico do SignInForm para evitar erro quando Clerk não está configurado
import dynamicImport from "next/dynamic";

const SignInForm = dynamicImport(
    () => import("@/components/auth/signin-form").then((mod) => mod.default),
    {
        ssr: false,
        loading: () => <AuthPlaceholder />,
    }
);

const SignInPage = () => {
    return (
        <div className="flex flex-col items-center justify-center size-full">
            <div className="max-w-xs mx-auto size-full flex flex-col items-center mt-[270px]">
                <Suspense fallback={<AuthPlaceholder />}>
                    <SignInForm />
                </Suspense>
            </div>
        </div>
    )
};

export default SignInPage
