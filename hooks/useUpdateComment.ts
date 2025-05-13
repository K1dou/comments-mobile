import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      idComment,
      content,
    }: {
      idComment: number;
      content: string;
    }) =>
      axios.put(
        `https://comments-api-c43806001036.herokuapp.com/api/v1/comments/${idComment}`,
        {
          content,
        }
      ),

    onMutate: async ({ idComment, content }) => {
      await queryClient.cancelQueries({ queryKey: ['comments'] });

      const previousData = queryClient.getQueryData<any>(['comments']);

      queryClient.setQueryData<any>(
        ['comments'],
        (
          oldData:
            | { pages: { content: { id: number; content: string }[] }[] }
            | undefined
        ) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              content: page.content.map((comment: any) =>
                comment.id === idComment ? { ...comment, content } : comment
              ),
            })),
          };
        }
      );

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
