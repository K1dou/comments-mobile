import { get } from '@/storage';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useInfiniteComments() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    get('token').then((t) => {
      console.log('Token carregado:', t);
      setToken(t);
    });
  }, []);
  const enabled = !!token;

  return useInfiniteQuery({
    queryKey: ['comments'],
    enabled,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(
        `https://comments-api-c43806001036.herokuapp.com/api/v1/comments/comments?page=${pageParam}&size=5&sort=createdAt,desc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Erro ao buscar comentários:', res.status, errorText);
        throw new Error('Erro ao buscar comentários');
      }

      const data = await res.json();

      return data;
    },

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !allPages) return undefined;
      return lastPage.last ? undefined : allPages.length;
    },
    initialPageParam: 0,
  });
}
