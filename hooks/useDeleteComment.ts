import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ idComment }: { idComment: number }) =>
      axios.delete(
        `https://comments-api-c43806001036.herokuapp.com/api/v1/comments/${idComment}`
      ),

    onMutate: async ({ idComment }) => {
      await queryClient.cancelQueries({ queryKey: ['comments'] });

      const previousData = queryClient.getQueryData(['comments']);

      queryClient.setQueryData(['comments'], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            content: page.content.filter((c: any) => c.id !== idComment),
          })),
        };
      });

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      // Reverte se der erro
      if (context?.previousData) {
        queryClient.setQueryData(['comments'], context.previousData);
      }
    },

    onSettled: () => {
      // Garante consistência final
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}
