import {FavoritesService} from '@/services/api';
import {QueryFunctionContext, useInfiniteQuery} from '@tanstack/react-query';
import {useMemo} from 'react';

const fetchFavorites = async ({
  pageParam,
}: QueryFunctionContext<string[], number>) => {
  try {
    const response = await FavoritesService.favoritesControllerFindAll(
      pageParam,
      10,
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const useFavorites = () => {
  const query = useInfiniteQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    getNextPageParam: prev => {
      if (!prev) return undefined;
      const next = prev.currentPage + 1;
      return next > 1 ? undefined : next;
    },
    initialPageParam: 1,
  });

  const favorites = useMemo(() => {
    return query.data?.pages.flatMap(page => page?.data ?? []) ?? [];
  }, [query.data]);

  return {
    favorites,
    fetchNextPage: query.fetchNextPage,
    hasNext: query.hasNextPage,
  };
};
