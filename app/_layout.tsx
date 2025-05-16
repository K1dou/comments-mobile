import { Slot, useRouter, useSegments } from 'expo-router';
import { useLoginContext, UserProvider } from '@/contexts/UserContext';
import { PortalProvider } from '@tamagui/portal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider } from 'tamagui';
import config from '@/tamagui.config';
import "../global.css";
import { useEffect } from 'react';

const queryClient = new QueryClient();

function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useLoginContext();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const isAuthRoute = segments[0] === '(auth)';

        if (!loading && !user && !isAuthRoute) {
            router.replace('/(auth)/login');
        }

        if (user && isAuthRoute) {
            router.replace('/');
        }
    }, [user, segments]);

    return <>{children}</>;
}



export default function RootLayout() {


    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <TamaguiProvider config={config}>
                    <AuthGuard>
                        <Slot />
                    </AuthGuard>
                </TamaguiProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
