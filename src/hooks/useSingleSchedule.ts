import {SchedulesService} from '@/services/api';
import {useQuery} from '@tanstack/react-query';

const fetchSchedule = async (id: string) => {
  try {
    const response = await SchedulesService.schedulesControllerGetOne(id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const useSingleSchedule = (id: string) => {
  return useQuery({
    queryKey: ['single-schedule', id],
    queryFn: () => fetchSchedule(id),
  });
};
