
import AvatarPicker from "@/components/AvatarPicker";
import Button from "@/components/Button";
import { Container } from "@/components/Container";
import Inputs from "@/components/Inputs";
import { Text, TouchableOpacity, View } from "react-native";

export default function Register() {

    return (
        <Container className='bg-[#101828] min-h-screen flex items-center justify-center'>

            <View className='bg-[#1E2939] w-[93%] rounded-2xl py-10 flex items-center justify-center'>
                <Text className='text-white font-bold text-3xl mb-7'>Criar Conta</Text>

                <Inputs placeholder='Nome' />
                <Inputs autoComplete="email" className="mt-4" placeholder='E-mail' />
                <Inputs secureTextEntry textContentType="password"
                    className='mt-4 mb-4' placeholder='Senha' />

                <AvatarPicker />

                <Button type='register' title='Registrar' className='mb-4' />


                <TouchableOpacity className='text-[#838C9B] text-lg mt-4'><Text className='text-blue-400 font-medium'>Já tem conta? Fazer login</Text></TouchableOpacity>
            </View>

        </Container>
    )
}