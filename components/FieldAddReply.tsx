import { useRef, useState } from "react";
import { View, TextInput, Image, TouchableOpacity, Text, findNodeHandle } from "react-native";
import { useLoginContext } from "../contexts/UserContext";
import { useReplyMutation } from "@/hooks/useReplyMutation";

interface FieldAddReplyProps {
    className?: string;
    parentId: number;
    onClick: () => void;
    parentAuthorName: string;
    scrollRef?: any;

}

export default function FieldAddReply({
    className,
    parentId,
    onClick,
    parentAuthorName,
    scrollRef,
}: FieldAddReplyProps) {
    const { user } = useLoginContext();
    const [text, setText] = useState<string>(`@${parentAuthorName} `);
    const replyComment = useReplyMutation();
    const inputRef = useRef<TextInput>(null);


    const handleFocus = () => {

        const nodeHandle = findNodeHandle(inputRef.current);

        if (inputRef.current?.isFocused() && nodeHandle) {
            (scrollRef.current as any)?.scrollToFocusedInput?.(nodeHandle, 150, 280);
        } else {
            console.warn('Input não está focado ou scrollRef inválido');
        }

    };


    function handleSubmitReply() {
        replyComment.mutate({
            content: text,
            userId: user?.id ?? 0,
            parentId: parentId,
        });
        setText("");
    }

    return (
        <View

            className={`bg-white py-3 px-3 rounded-[10px] ${className}`}>
            <TextInput
                ref={inputRef}
                onFocus={handleFocus}
                value={text}
                onChangeText={setText}
                placeholder="Add a comment..."
                multiline
                numberOfLines={4}
                className="w-full h-24 pl-4 pt-2 border border-gray-300 rounded-[7px] font-regular text-black focus:border-[#5457B6]"
                placeholderTextColor="#9ca3af" // gray-400
            />


            <View className="flex-row justify-between items-center mt-3">
                <Image
                    source={{ uri: user?.avatarUrl }}
                    className="h-9 w-9 rounded-full bg-gray-300"
                />
                <TouchableOpacity
                    onPress={() => {
                        onClick();
                        handleSubmitReply();
                    }}
                    className="bg-[#5457B6] py-2 px-6 rounded-[8px]"
                >
                    <Text className="text-white uppercase font-semibold">Reply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
