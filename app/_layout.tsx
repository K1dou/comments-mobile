import { Slot } from 'expo-router';
import { UserProvider } from '@/contexts/UserContext';
import { PortalProvider } from '@tamagui/portal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider } from 'tamagui';
import config from '@/tamagui.config';
import "../global.css";



export default function RootLayout() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <TamaguiProvider config={config}>
                    <Slot />
                </TamaguiProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
