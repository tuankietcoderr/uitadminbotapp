import {API} from '@/constants';
import {BaseResponse} from '@/types';
import {Message, Room} from '@/types/schema';
import instance from '../instance';

export const roomService = {
  getRoomMessages: async (roomId: string) => {
    return await instance.get<BaseResponse<Message[]>>(
      API.ROOM.GET_MESSAGES(roomId),
    );
  },
  deleteRoom: async () => {
    return await instance.delete<BaseResponse<Room>>(API.ROOM.DELETE);
  },
};
