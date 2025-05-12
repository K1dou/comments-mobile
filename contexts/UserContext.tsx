import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { ReactNode, SetStateAction } from 'react';
import { getMe, login } from '@/services/authService';
import { get, save } from '@/storage';

interface User {
    id: number;
    username: string;
    avatarUrl: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const doFakeLogin = async () => {
            // const token = localStorage.getItem('token');
            const tokenMobile = await get('token');

            if (!tokenMobile) {
                try {
                    const res = await login('hique1276@gmail.com', '123456');
                    const { token, refreshToken } = res.data;

                    // localStorage.setItem('token', token);
                    // localStorage.setItem('refreshToken', refreshToken);

                    await save('token', token);
                    await save('refreshToken', refreshToken);

                    const tokenMobile = await get('token');
                    console.log('Token recuperado no login:', tokenMobile);


                } catch (err) {
                    console.error('Login falso falhou:', err);
                }
            }

            try {
                const me = await getMe();
                setUser(me.data);
                console.log('Usuário logado:', me.data);
            } catch (err) {
                console.error('Erro ao buscar /me:', err);
            }
        };

        doFakeLogin();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
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