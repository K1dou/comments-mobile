import { createContext, useContext, useEffect, useState } from 'react';

import { login as authLogin, getMe } from '@/services/authService';
import { get, save } from '@/storage';
import type { ReactNode } from 'react';

interface User {
    id: number;
    username: string;
    avatarUrl: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<void>;

}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);


    // 🔄 Autologin apenas se já existir token salvo
    useEffect(() => {
        const tryAutoLogin = async () => {
            const token = await get('token');

            if (token) {
                try {
                    const me = await getMe();
                    setUser(me.data);
                } catch (err) {
                    console.error('Erro ao buscar /me:', err);
                }
            }
        };

        tryAutoLogin();
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


    return (
        <UserContext.Provider value={{ user, setUser, login }}>
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