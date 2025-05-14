
import AvatarPicker from "@/components/AvatarPicker";
import Button from "@/components/Button";
import { Container } from "@/components/Container";
import Inputs from "@/components/Inputs";
import { Link, router } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";



export default function Register() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const [errors, setErrors] = useState<{ nome?: string; email?: string; password?: string }>({});

    const validate = () => {
        const errs: typeof errors = {};
        if (!nome.trim()) errs.nome = "Nome é obrigatório";
        if (!email.trim()) errs.email = "E-mail é obrigatório";
        if (!password.trim()) errs.password = "Senha é obrigatória";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };


    const handleSubmit = async () => {
        if (!validate()) return;

        const user = { nome, email, password };
        const formData = new FormData();

        formData.append("usuario", {
            name: "usuario.json",
            type: "application/json",
            uri: `data:application/json;utf-8,${encodeURIComponent(JSON.stringify(user))}`,
        } as any);

        if (avatar) {
            formData.append("avatar", {
                uri: avatar.uri,
                name: avatar.fileName || "avatar.jpg",
                type: avatar.type || "image/jpeg",
            } as any);
        }

        try {
            await axios.post("https://comments-api-c43806001036.herokuapp.com/users/createUser", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            Alert.alert("Sucesso", "Conta criada com sucesso!");
            router.replace("/login");
        } catch (err: any) {
            console.error("Erro ao registrar:", err?.response?.data || err.message);
            Alert.alert("Erro", "Falha ao criar conta.");
        }
    };

    return (
        <Container className="bg-[#101828] min-h-screen flex items-center justify-center">
            <View className="bg-[#1E2939] w-[93%] rounded-2xl py-10 flex items-center justify-center">
                <Text className="text-white font-bold text-3xl mb-7">Criar Conta</Text>

                <Inputs
                    placeholder="Nome"
                    value={nome}
                    onChangeText={(text) => {
                        setNome(text);
                        if (errors.nome) setErrors((prev) => ({ ...prev, nome: undefined }));
                    }}
                />
                {errors.nome && <Text className="text-red-400 text-sm mt-1">{errors.nome}</Text>}

                <Inputs
                    placeholder="E-mail"
                    value={email}
                    autoComplete="email"
                    className="mt-4"
                    onChangeText={(text) => {
                        setEmail(text);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                />
                {errors.email && <Text className="text-red-400 text-sm mt-1">{errors.email}</Text>}


                <Inputs
                    placeholder="Senha"
                    secureTextEntry
                    textContentType="password"
                    value={password}
                    className="mt-4 mb-4"
                    onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                />
                {errors.password && <Text className="text-red-400 text-sm mt-1">{errors.password}</Text>}

                <AvatarPicker imageUri={avatar?.uri || null} onPick={setAvatar} />

                <Button type="register" title="Registrar" className="mb-4 mt-8" onPress={handleSubmit} />

                <TouchableOpacity className="text-[#838C9B] text-lg mt-4">
                    <Link href="/login" className="text-blue-400 font-medium">Já tem conta? Fazer login</Link>
                </TouchableOpacity>
            </View>
        </Container>
    );
}