import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";


interface FieldAddComentProps {
    className?: string;
    parentId: number;
    onClick: () => void;
    parentAuthorName: string

}

export default function FieldAddReply({ className, parentId, onClick, parentAuthorName }: FieldAddComentProps) {



    // const { user } = useLoginContext();
    const [text, setText] = useState<string>(`@${parentAuthorName} `);
    // const replyComment = useReplyMutation();


    // function handleChangeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    //     setText(event.target.value);
    // }


    // function handleSubmitReply() {
    //     replyComment.mutate({
    //         content: text,
    //         userId: user?.id ?? 0,
    //         parentId: parentId
    //     });
    //     setText("");
    // }



    return (
        <View className={`bg-White py-3 px-3 rounded-[10px] ${className}`}>
            <TextInput
                value={text}

                className="focus:ring-1 focus:ring-Purple-600 hover:bg-Purple-700 transition duration-200 ease-in-out  w-full h-24 pl-4 pt-2 border-1  border-gray-300 rounded-[7px] font-regular focus:outline-none"
                placeholder="Add a comment..."
            ></TextInput>

            <View className="flex justify-between items-center mt-3">
                <Image
                    className="h-9 w-9 rounded-full bg-cover"

                    alt=""
                />
                <TouchableOpacity
                    aria-label="Reply"

                    className="cursor-pointer uppercase bg-Purple-600 text-White py-2 px-6 rounded-[8px] "
                ><Text>Reply</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}