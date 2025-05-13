
import Button from "@/components/Button";
import { Container } from "@/components/Container";
import Inputs from "@/components/Inputs";
import { useLoginContext } from "@/contexts/UserContext";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLoginContext();

    const handleSubmit = async () => {
        try {
            await login(email, password);
            router.replace("/");
        } catch (error) {
            console.error("Erro ao logar:", error);
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
                    onPress={() =>
                        Alert.alert("Indisponível", "Login com Google ainda não implementado.")
                    }
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