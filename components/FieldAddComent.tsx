import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { useLoginContext } from '../contexts/UserContext';
import { useCommentMutation } from '@/hooks/useCommentMutation';

interface FieldAddComentProps {
    className?: string;
}

export default function FieldAddComent({ className }: FieldAddComentProps) {
    const { user } = useLoginContext();
    const commentMutation = useCommentMutation();
    const [text, setText] = useState<string>("");

    function handleSubmitComment() {
        commentMutation.mutate({
            content: text,
            userId: user?.id ?? 0,
        });
        setText("");
    }

    return (
        <View className={`bg-white p-3 rounded-[10px] ${className}`}>
            <TextInput
                value={text}
                onChangeText={setText}
                multiline
                placeholder="Add a comment..."
                className="w-full h-24 p-2 border border-gray-300 rounded-[7px] text-base"
            />

            <View className="flex-row justify-between items-center mt-3">
                {user?.avatarUrl && (
                    <Image
                        source={{ uri: user.avatarUrl }}
                        className="h-9 w-9 rounded-full"
                        resizeMode="cover"
                    />
                )}
                <TouchableOpacity
                    onPress={handleSubmitComment}
                    className="bg-purple-600 py-2 px-6 rounded-[8px]"
                >
                    <Text className="text-white font-semibold uppercase">Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
