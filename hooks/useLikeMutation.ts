import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      userId,
    }: {
      commentId: number;
      userId: number;
    }) =>
      axios.post(
        `https://comments-api-c43806001036.herokuapp.com/api/v1/comments/${commentId}/${userId}/like`
      ),

    onMutate: async ({ commentId, userId }) => {
      await queryClient.cancelQueries({ queryKey: ['comments'] });

      const previousData = queryClient.getQueryData(['comments']);

      queryClient.setQueryData(['comments'], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            content: page.content.map((comment: any) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  likeCount: (comment.likeCount ?? 0) + 1,
                  likedByUser: true,
                };
              }
              return comment;
            }),
          })),
        };
      });

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['comments'], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}
