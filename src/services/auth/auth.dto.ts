import {ChatUser} from '@/types/schema/User';

export type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
  user: ChatUser;
  accessTokenExpiration: number;
  refreshTokenExpiration: number;
  room: string;
};

export type RegisterChatUserResponseDto = LoginResponseDto;
