import { useDeleteComment } from '@/hooks/useDeleteComment';
import { useUpdateComment } from '@/hooks/useUpdateComment';
import { formatRelativeDate } from '@/utils/date';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLoginContext } from '../contexts/UserContext';
import FieldAddReply from './FieldAddReply';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ModalDelete from './ModalDelete';

interface CardCommentProps {
    id: number;
    name: string;
    content: string;
    like: number;
    src: string;
    onClickLike?: () => void;
    onClickUnlike?: () => void;
    createdAt: string;
    idAuthor: number;
    likedByUser: boolean;
    openReply?: () => void;
    replyIsTrue?: boolean;
    level?: number;
    replyCount?: number;

}

export default function CardComment({
    replyCount,
    name,
    content,
    like,
    src,
    id,
    idAuthor,
    onClickLike,
    onClickUnlike,
    createdAt,
    likedByUser,
    openReply,
    replyIsTrue,
    level = 0,
}: CardCommentProps) {
    const [reply, setReply] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const { user } = useLoginContext();
    const deleteComment = useDeleteComment();
    const updateComment = useUpdateComment();

    function handleDeleteComment() {
        console.log('Deleting comment with ID:', id);
        if (user?.id) {
            deleteComment.mutate({ idComment: id });
        }
    }

    function handleReply() {
        setReply(!reply);
    }

    function handleUpdateComment() {
        if (editedContent.trim() && editedContent !== content) {
            updateComment.mutate({ idComment: id, content: editedContent });
            setIsEditing(false);
        }
    }

    function renderContentWithMention(content: string) {
        return content.split(/(@\w+)/g).map((part, index) => (
            <Text key={index} className={part.startsWith('@') ? 'text-[#5457B6] font-semibold' : ''}>
                {part}
            </Text>
        ));
    }

    return (
        <>
            <View className="py-3 bg-white px-3 rounded-[10px] mb-2">
                <View className="flex-row items-center gap-3">
                    {src ? (
                        <Image source={{ uri: src }} className="h-9 w-9 rounded-full" />
                    ) : (
                        <View className="h-9 w-9 rounded-full bg-gray-300" />
                    )}
                    <Text className="font-semibold">{name}</Text>
                    {user?.id === idAuthor && (
                        <Text className="bg-[#5758AB] text-white rounded-2xl px-2 py-1 text-[10px]">You</Text>
                    )}
                    <Text className="text-gray-500 text-xs">{formatRelativeDate(createdAt)}</Text>
                </View>

                <View className="mt-3">
                    {isEditing ? (
                        <TextInput
                            multiline
                            value={editedContent}
                            onChangeText={setEditedContent}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    ) : (
                        <Text className="text-gray-500">{renderContentWithMention(content)}</Text>
                    )}
                </View>

                <View className="flex-row justify-between mt-4 gap-2">
                    <View className="bg-[#F5F6FA] flex-row gap-2 items-center rounded-[10px] py-2 px-2">

                        {likedByUser ? (
                            <TouchableOpacity onPress={onClickUnlike} className="p-1 rounded-full">
                                <AntDesign name="heart" size={16} color="#6b8e23" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={onClickLike} className="p-1 rounded-full">
                                <AntDesign name="hearto" size={16} color="black" />
                            </TouchableOpacity>
                        )}
                        <Text className="font-bold text-[#5758AB]">{like}</Text>

                    </View>

                    {user?.id === idAuthor ? (
                        <View className="flex-row gap-4 items-center">
                            {isEditing ? (
                                <>
                                    <TouchableOpacity
                                        onPress={handleUpdateComment}
                                        className="bg-[#5758AB] px-3 py-1 rounded-md"
                                    >
                                        <Text className="text-white font-bold">Update</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity

                                        onPress={() => {
                                            setIsEditing(false);
                                            setEditedContent(content);
                                        }}
                                    >
                                        <Text className="text-gray-500 text-sm">Cancel</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <ModalDelete onDelete={handleDeleteComment} />

                                    <TouchableOpacity
                                        onPress={() => setIsEditing(true)}
                                        className="flex-row gap-1 items-center"
                                    >
                                        <MaterialIcons name="edit" size={16} color="#5758AB" />
                                        <Text className="text-[#5758AB] font-bold">Edit</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    ) : (


                        <View className='flex flex-row gap-6 items-center'>
                            {level === 0 && (
                                <TouchableOpacity onPress={openReply} className="flex-row gap-1 items-center">
                                    <MaterialCommunityIcons

                                        name={
                                            (replyCount ?? 0) > 0
                                                ? (replyIsTrue ? 'comment-multiple' : 'comment-multiple-outline')
                                                : 'comment-multiple-outline'
                                        }
                                        size={18}
                                        color="#5758AB"
                                    />
                                    <Text
                                        className="text-[#5758AB] font-bold min-w-[16px] text-center"
                                    >
                                        {(replyCount ?? 0) > 0 ? replyCount : ' '}
                                    </Text>
                                </TouchableOpacity>
                            )}




                            <TouchableOpacity
                                onPress={handleReply}
                                className="flex-row gap-1 items-center"
                            >
                                <EvilIcons name="comment" size={24} color="#5758AB" />
                                <Text className="text-[#5758AB] font-bold">Reply</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

            </View>
            <View>
                {reply && (
                    <View className="mt-3">
                        <FieldAddReply parentAuthorName={name} onClick={handleReply} parentId={id} />
                    </View>
                )}
            </View>
        </>
    );
}
