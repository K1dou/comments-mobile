import { useState } from 'react';
import { View, Image, Text, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function AvatarPicker() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    async function handlePickImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            return Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria.');
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [1, 1],
            quality: 1,
            allowsEditing: true,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    }

    return (
        <View className="items-center gap-3">
            {imageUri ? (
                <Image
                    source={{ uri: imageUri }}
                    className="w-24 h-24 rounded-full border-2 border-gray-600"
                />
            ) : (
                <View className="w-24 h-24 rounded-full bg-gray-700 items-center justify-center border-2 border-gray-600">
                    <Text className="text-gray-400 text-sm">Preview</Text>
                </View>
            )}

            <Pressable onPress={handlePickImage}>
                <Text className="text-sm text-blue-400 underline">Escolher imagem de perfil</Text>
            </Pressable>
        </View>
    );
}
