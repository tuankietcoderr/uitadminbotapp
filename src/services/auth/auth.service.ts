import {API} from '@/constants';
import {BaseResponse} from '@/types';
import {ChatUser} from '@/types/schema';
import instance from '../instance';
import {RegisterChatUserResponseDto} from './auth.dto';

export const authService = {
  me: async () => {
    return await instance.get<
      BaseResponse<
        ChatUser & {
          room: string;
        }
      >
    >(API.AUTH.ME);
  },
  refreshToken: async (refreshToken: string) => {
    return await instance.post(API.AUTH.REFRESH_TOKEN, {refreshToken});
  },
  registerChatUser: async () => {
    return await instance.post<BaseResponse<RegisterChatUserResponseDto>>(
      API.AUTH.REGISTER.CHAT_USER,
    );
  },
};
