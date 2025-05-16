import { createContext, useContext, useEffect, useState } from 'react';

import { login as authLogin, getMe } from '@/services/authService';
import { get, remove, save } from '@/storage';
import type { ReactNode } from 'react';
import { router } from 'expo-router';

interface User {
    id: number;
    username: string;
    avatarUrl: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;


}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const loadUser = async () => {
            console.log('🔄 Carregando usuário...');
            const token = await get('token');
            console.log('🔐 Token encontrado:', token);

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const me = await getMe();
                console.log('✅ Usuário logado:', me.data);
                setUser(me.data);
            } catch (err) {
                console.error('❌ Erro ao buscar /me:', err);
                await remove('token');
                await remove('refreshToken');
                setUser(null);
                router.replace('/(auth)/login');
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);
    const login = async (email: string, password: string) => {
        try {
            const res = await authLogin(email, password);
            if (!res || !res.data) {
                throw new Error('Invalid response from login service');
            }
            const { token, refreshToken } = res.data;

            await save('token', token);
            await save('refreshToken', refreshToken);

            const me = await getMe();
            setUser(me.data);

            console.log('Login realizado com sucesso');
        } catch (err) {
            console.error('Erro ao logar:', err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await remove('token');
            await remove('refreshToken');
            setUser(null);
            router.replace('/login');
            console.log('Logout realizado com sucesso');
        } catch (err) {
            console.error('Erro ao fazer logout:', err);
        }
    };



    return (
        <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useLoginContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser deve ser usado dentro de um <UserProvider>');
    }
    return context;
};