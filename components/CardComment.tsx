import { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useLoginContext } from '../contexts/UserContext';
import FieldAddReply from './FieldAddReply';
import { useDeleteComment } from '@/hooks/useDeleteComment';
import { useUpdateComment } from '@/hooks/useUpdateComment';
import { formatRelativeDate } from '@/utils/date';
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
}

export default function CardComment({
    name,
    content,
    like,
    src,
    id,
    idAuthor,
    onClickLike,
    onClickUnlike,
    createdAt,
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
            <Text key={index} className={part.startsWith('@') ? 'text-purple-600 font-semibold' : ''}>
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
                    {/* Like box */}
                    <View className="bg-[#F5F6FA] flex-row gap-3 items-center rounded-[10px] py-2 px-2">
                        <TouchableOpacity onPress={onClickLike} className="p-1 rounded-full">
                            <Image source={require('../assets/icon-plus.png')} className="w-4 h-4" />
                        </TouchableOpacity>
                        <Text className="font-bold text-[#5758AB]">{like}</Text>
                        <TouchableOpacity onPress={onClickUnlike} className="p-1 rounded-full">
                            <Image source={require('../assets/icon-minus.png')} className="w-4 h-4" />
                        </TouchableOpacity>
                    </View>

                    {/* Action buttons */}
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
                                        <Image source={require('../assets/icon-edit.png')} className="w-3 h-3" />
                                        <Text className="text-[#5758AB] font-bold">Edit</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={handleReply}
                            className="flex-row gap-2 items-center"
                        >
                            <Image source={require('../assets/icon-reply.png')} className="w-4 h-4" />
                            <Text className="text-[#5758AB] font-bold">Reply</Text>
                        </TouchableOpacity>
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
