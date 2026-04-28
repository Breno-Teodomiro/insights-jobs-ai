export const dynamic = 'force-dynamic';

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallback() {
    return <AuthenticateWithRedirectCallback
        signInForceRedirectUrl="/auth-callback"
        signUpForceRedirectUrl="/auth-callback"
    />;
};
