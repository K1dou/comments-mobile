import { View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { remove } from '@/storage';


type RootStackParamList = {
    Login: undefined;
};

export default function Navbar() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleLogout = async () => {
        await remove('token');
        await remove('refreshToken');

        navigation.navigate('Login');
    };



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
                style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
            >
                <View className="px-4 py-3 flex-row items-center justify-between">
                    <View className="flex-row items-center space-x-2">
                        <Feather name="message-circle" size={24} color="white" />
                        <Text className="text-white font-bold text-lg">Comments</Text>
                    </View>
                    <TouchableOpacity onPress={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                        <Text className="text-white font-semibold">Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}
