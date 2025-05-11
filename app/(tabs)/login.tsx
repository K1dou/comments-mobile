
import Button from "@/components/Button";
import { Container } from "@/components/Container";
import Inputs from "@/components/Inputs";
import { Text, TouchableOpacity, View } from "react-native";

export default function Login() {

    return (
        <Container className='bg-[#101828] min-h-screen flex items-center justify-center'>

            <View className='bg-[#1E2939] w-[93%] rounded-2xl py-10 flex items-center justify-center'>
                <Text className='text-white font-bold text-3xl mb-7'>Entrar</Text>
                <Inputs placeholder='E-mail' />
                <Inputs className='mt-4 mb-4' placeholder='Senha' />

                <Button type='loginDefault' title='Login' className='mb-4' />
                <Button type='loginGoogle' title='Entrar com Google' />

                <Text className='text-[#838C9B] text-lg mt-4 '>Não tem uma conta? <TouchableOpacity className='text-center mt-[10px]'><Text className='text-blue-400 underline '>Criar conta</Text></TouchableOpacity></Text>
            </View>

        </Container>
    )
}