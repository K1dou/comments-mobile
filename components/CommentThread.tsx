import { View } from 'react-native';
import { useLoginContext } from '../contexts/UserContext';
import { useLikeMutation } from '../hooks/useLikeMutation';
import { useUnlikeMutation } from '../hooks/useUnlikeMutation';
import CardComment from './CardComment';
import { useState } from 'react';

interface CommentThreadProps {
    comment: any;
    level?: number;
}

export default function CommentThread({ comment, level = 0 }: CommentThreadProps) {

    const likeComment = useLikeMutation();
    const unlikeComent = useUnlikeMutation();
    const { user } = useLoginContext();
    const [reply, setReply] = useState(false);

    const flattenedReplies =
        level === 0
            ? [
                ...(comment.replies || []),
                ...comment.replies?.flatMap((r: any) => r.replies || []) || [],
            ]
            : [];

    const replyCount = comment.replies?.length || 0;


    return (
        <View className={`pt-6 ${level > 0 ? 'pl-6 ml-4 border-l-2 border-gray-200' : ''}`}>
            <CardComment
                replyCount={replyCount}
                level={level}
                replyIsTrue={reply}
                openReply={() => setReply(!reply)}
                likedByUser={comment.likedByUser}
                createdAt={comment.createdAt}
                id={comment.id}
                idAuthor={comment.author.id}
                name={comment.author.nome}
                content={comment.content}
                like={comment.likeCount || 0}
                src={comment.author.avatarUrl}
                onClickLike={() =>
                    user?.id && likeComment.mutate({ commentId: comment.id, userId: user.id })
                }
                onClickUnlike={() =>
                    user?.id && unlikeComent.mutate({ commentId: comment.id, userId: user.id })
                }
            />

            {flattenedReplies.length > 0 && reply && (
                <View className="flex flex-col gap-4 mt-2">
                    {flattenedReplies.map((reply: any) => (
                        <CommentThread key={reply.id} comment={reply} level={1} />
                    ))}
                </View>
            )}
        </View>
    );
}
