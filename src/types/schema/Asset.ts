import {ChatUser} from './User';

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
  user: ChatUser;
  accessTokenExpiration: number;
  refreshTokenExpiration: number;
};

export type RegisterChatUserResponseDto = LoginResponseDto;
