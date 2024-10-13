import {QUERY_KEY} from '@/constants';
import {useQuery} from '@tanstack/react-query';
import {roomService} from './room.service';

export const useGetRoomMessagesQuery = (roomId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ROOM.GET_MESSAGES, roomId],
    queryFn: async () => {
      const res = await roomService.getRoomMessages(roomId);
      return res.data;
    },
  });
};
