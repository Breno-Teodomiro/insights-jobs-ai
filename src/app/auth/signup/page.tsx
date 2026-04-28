import { AuthPlaceholder } from "@/components/auth/auth-placeholder";
import { Suspense } from "react";

// Import dinâmico do SignUpForm para evitar erro quando Clerk não está configurado
import dynamicImport from "next/dynamic";

const SignUpForm = dynamicImport(
    () => import("@/components/auth/signup-form").then((mod) => mod.default),
    {
        ssr: false,
        loading: () => <AuthPlaceholder />,
    }
);

const SignUpPage = () => {
    return (
        <div className="flex flex-col items-center justify-center size-full">
            <div className="max-w-xs mx-auto size-full flex flex-col items-center mt-[270px]">
                <Suspense fallback={<AuthPlaceholder />}>
                    <SignUpForm />
                </Suspense>
            </div>
        </div>
    )
};

export default SignUpPage
