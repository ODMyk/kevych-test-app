import {ScheduleChangeEventPayload, ScheduleResponseDto} from '@/services/api';
import {QueryClient} from '@tanstack/react-query';
import Constants from 'expo-constants';
import {io, Socket} from 'socket.io-client';
import {keychain} from './keychain';

let socket: Socket | null = null;
let _queryClient: QueryClient | null = null;

export const connectWebSocket = async (queryClient: QueryClient) => {
  _queryClient = queryClient;
  const token = await keychain.getToken();

  if (!token) {
    return;
  }

  if (socket && socket.connected) {
    return;
  }

  socket = io(`${Constants.expoConfig?.extra?.BACKEND_API_URL}/train-updates`, {
    query: {token: token},
    transports: ['websocket'],
    auth: {
      token: token,
    },
  });

  socket.on('schedule:changed', (payload: ScheduleChangeEventPayload) => {
    if (!_queryClient) {
      return;
    }

    let shouldUpdateFavorites = false;

    _queryClient.setQueryData(['schedules'], (oldData: any) => {
      if (!oldData || !oldData.pages) return oldData;

      const updatedPages = oldData.pages.map(
        (page: {data: ScheduleResponseDto[]}) => {
          let newPageData = [...page.data];

          switch (payload.changeType) {
            case 'created':
              if (payload.schedule && page === oldData.pages[0]) {
                if (
                  !newPageData.some(item => item.id === payload.schedule?.id)
                ) {
                  newPageData = [payload.schedule, ...newPageData];
                }
              }
              break;

            case 'updated':
              if (payload.schedule) {
                _queryClient?.invalidateQueries({
                  queryKey: ['single-schedule', payload.schedule.id],
                });
                const itemIndex = newPageData.findIndex(
                  item => item.id === payload.schedule?.id,
                );
                if (itemIndex !== -1) {
                  shouldUpdateFavorites = newPageData[itemIndex].isFavorite;
                  newPageData[itemIndex] = {
                    ...payload.schedule,
                    isFavorite: newPageData[itemIndex].isFavorite,
                  };
                }
              }
              break;

            case 'deleted':
              if (payload.scheduleId) {
                newPageData = newPageData.filter(
                  item => item.id !== payload.scheduleId,
                );
              }
              break;
          }
          return {...page, data: newPageData};
        },
      );

      return {...oldData, pages: updatedPages};
    });

    if (shouldUpdateFavorites) {
      _queryClient.setQueryData(['favorites'], prev => {
        return {
          ...(prev as any),
          pages: (prev as any)?.pages?.map(page => {
            return {
              ...page,
              data: (page as any)?.data?.map((schedule: any) => {
                if (schedule.id === payload.schedule?.id) {
                  return {
                    ...schedule,
                    ...payload.schedule,
                    isFavorite: schedule.isFavorite,
                  };
                }
                return schedule;
              }),
            };
          }),
        };
      });
    }
  });
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    _queryClient = null;
  }
};
