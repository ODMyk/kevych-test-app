import {SchedulesService} from '@/services/api';
import {useFiltersStore} from '@/store/filters';
import {QueryFunctionContext, useInfiniteQuery} from '@tanstack/react-query';
import {useMemo} from 'react';

export const useSchedules = () => {
  const {date, origin, destination, trainType} = useFiltersStore();
  const fetchSchedules = async ({
    pageParam,
  }: QueryFunctionContext<string[], number>) => {
    try {
      const response = await SchedulesService.schedulesControllerGetMany(
        pageParam,
        10,
        date,
        trainType,
        origin,
        destination,
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const key = ['schedules', date, origin, destination, trainType].filter(
    k => k !== undefined,
  );

  const query = useInfiniteQuery({
    queryKey: key,
    queryFn: fetchSchedules,
    getNextPageParam: prev => {
      if (!prev) return undefined;
      const next = prev.currentPage + 1;
      return next > 12 ? undefined : next;
    },
    initialPageParam: 1,
  });

  const schedules = useMemo(() => {
    return query.data?.pages.flatMap(page => page?.data ?? []) ?? [];
  }, [query.data]);

  return {
    schedules,
    fetchNextPage: query.fetchNextPage,
    hasNext: query.hasNextPage,
  };
};
