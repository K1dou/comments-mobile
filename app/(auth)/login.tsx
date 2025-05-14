
import Button from "@/components/Button";
import { Container } from "@/components/Container";
import Inputs from "@/components/Inputs";
import { useLoginContext } from "@/contexts/UserContext";
import { save } from "@/storage";
import { Buffer } from 'buffer';
import { Link, router } from "expo-router";

import { getMe } from "@/services/authService";
import * as WebBrowser from 'expo-web-browser';
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, setUser } = useLoginContext();




    const handleGoogleLogin = async () => {
        try {
            const redirectUri = 'commentsmobile://oauth2redirect';


            const state = Buffer.from(redirectUri)
                .toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');

            const authUrl = `https://comments-api-c43806001036.herokuapp.com/oauth2/authorization/google?state=${state}`;

            const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

            console.log('🟣 result from WebBrowser:', result);

            if (result.type === 'success' && result.url) {
                const url = new URL(result.url);
                const token = url.searchParams.get('token');
                const refreshToken = url.searchParams.get('refreshToken');


                if (token && refreshToken) {
                    await save('token', token);
                    await save('refreshToken', refreshToken);
                    const me = await getMe();
                    setUser(me.data);
                    router.replace('/');
                } else {
                    Alert.alert('Erro', 'Token JWT não retornado.');
                    console.warn('result object:', result);
                }
            } else {
                Alert.alert('Erro', 'Login cancelado ou falhou.');

            }
        } catch (err) {
            Alert.alert('Erro', 'Algo deu errado');
        }
    };

    const handleSubmit = async () => {
        try {
            await login(email, password);
            router.replace("/");
        } catch (error) {
            Alert.alert("Erro", "Credenciais inválidas ou erro de conexão.");
        }
    };


    return (
        <Container className="bg-[#101828] min-h-screen flex items-center justify-center">
            <View className="bg-[#1E2939] w-[93%] rounded-2xl py-10 flex items-center justify-center">
                <Text className="text-white font-bold text-3xl mb-7">Entrar</Text>

                <Inputs
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Inputs
                    className="mt-4 mb-4"
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <Button
                    type="loginDefault"
                    title="Login"
                    className="mb-4"
                    onPress={handleSubmit}
                />

                <Button
                    type="loginGoogle"
                    title="Entrar com Google"
                    onPress={handleGoogleLogin}
                />

                <Text className="text-[#838C9B] text-lg mt-4">
                    Não tem uma conta?{" "}
                    <TouchableOpacity className="text-center mt-[10px]">
                        <Link href="/register" className="text-blue-400 underline">
                            Criar conta
                        </Link>
                    </TouchableOpacity>
                </Text>
            </View>
        </Container>
    )
}