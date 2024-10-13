import {API} from '@/constants';
import {BaseResponse} from '@/types';
import {Message} from '@/types/schema';
import instance from '../instance';
import {SendMessageDto} from './message.dto';

export const messageService = {
  sendMessage: async (data: SendMessageDto, signal?: AbortSignal) => {
    return await instance.post<BaseResponse<Message>>(API.MESSAGE.SEND, data, {
      signal,
    });
  },
  likeMessage: async (messageId: string) => {
    return await instance.put<BaseResponse<Message>>(
      API.MESSAGE.LIKE(messageId),
    );
  },
  dislikeMessage: async (messageId: string) => {
    return await instance.put<BaseResponse<Message>>(
      API.MESSAGE.DISLIKE(messageId),
    );
  },
};
