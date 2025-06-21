import {QueryClient} from '@tanstack/react-query';
import {FavoritesService} from './api';

export const switchFavorite = async (
  isLiked: boolean,
  id: string,
  queryClient: QueryClient,
) => {
  if (isLiked) {
    await FavoritesService.favoritesControllerDelete(id);
  } else {
    await FavoritesService.favoritesControllerCreate({
      scheduleId: id,
    });
  }

  await queryClient.setQueryData(['single-schedule', id], prev => {
    if (!prev) {
      return prev;
    }
    return {
      ...(prev as any),
      isFavorite: !isLiked,
    };
  });

  await queryClient.setQueryData(['schedules'], prev => {
    return {
      ...(prev as any),
      pages: (prev as any)?.pages?.map(page => {
        if (page?.data.some(favorite => favorite.id === id)) {
          return {
            ...page,
            data: page.data.map(favorite =>
              favorite.id === id
                ? {...favorite, isFavorite: !isLiked}
                : favorite,
            ),
          };
        }
        return page;
      }),
    };
  });

  await queryClient.invalidateQueries({
    queryKey: ['favorites'],
    refetchType: 'all',
  });
};
