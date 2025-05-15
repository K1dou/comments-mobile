import { useLoginContext } from '@/contexts/UserContext';
import { Feather } from '@expo/vector-icons';
import { Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


type RootStackParamList = {
    Login: undefined;
};

export default function Navbar() {
    const { logout } = useLoginContext();



    return (

        <>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <SafeAreaView
                edges={['top']}
                className="bg-gray-900"
            >
                <View className="px-4 py-3 flex-row items-center justify-between">
                    <View className="flex-row items-center space-x-2">
                        <Feather name="message-circle" size={24} color="white" />
                        <Text className="text-white font-bold text-lg">Comments</Text>
                    </View>
                    <TouchableOpacity onPress={logout} className="bg-red-500 px-3 py-1 rounded">
                        <Text className="text-white font-semibold">Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}
