import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Login: undefined;
};

export default function Navbar() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        navigation.navigate('Login');
    };

    return (
        <View
            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
            className="bg-gray-900 px-6 py-4  flex-row justify-between items-center w-full">
            <Text className="text-white text-xl font-bold">💬 Comments</Text>

            <TouchableOpacity
                accessibilityLabel="logout"
                onPress={handleLogout}
                className="bg-red-600 px-4 py-1.5 rounded-md"
            >
                <Text className="text-white font-semibold text-sm">Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
