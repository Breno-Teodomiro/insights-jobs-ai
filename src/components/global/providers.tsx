"use client";

import React from "react"
import { ClerkProvider } from "@clerk/nextjs"
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
    children: React.ReactNode;
}

// const client = new QueryClient();

const Providers = ({ children }: Props) => {
    // Verifica se a chave do Clerk está configurada
    const hasClerkKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
                        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder';
    
    // Se não houver chave válida, renderiza sem Clerk (modo estático)
    if (!hasClerkKey) {
        return <>{children}</>;
    }
    
    return (
        // <QueryClientProvider client={client}>
        <ClerkProvider>
            {children}
        </ClerkProvider>
        // </QueryClientProvider> 
    );
};

export default Providers