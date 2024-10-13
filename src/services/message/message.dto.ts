import {MessageContent} from '@/types/schema';

export type SendMessageDto = {
  question: MessageContent;
  room: string;
  extra?: Record<string, any>;
};
