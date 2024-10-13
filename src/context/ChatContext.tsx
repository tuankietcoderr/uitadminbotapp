import {SendMessageDto, useSendMessageMutation} from '@/services/message';
import {Message} from '@/types/schema';
import {randomUUID} from '@/utils/crypto';
import {CanceledError} from 'axios';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {Alert, TextInput} from 'react-native';

type ChatContextType = {
  content: string;
  setContent: (content: string) => void;
  sendMessage: (data: SendMessageDto) => void;
  hasContent: boolean;
  inputRef?: React.RefObject<TextInput>;
  isSending: boolean;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatContextProvider = ({children}: PropsWithChildren) => {
  const inputRef = useRef<TextInput>(null);
  const [content, setContent] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const hasContent = !!content.trim().length;

  const sendMessageMutation = useSendMessageMutation();
  const isSending = sendMessageMutation.isPending;

  const sendMessage = useCallback(
    (data: SendMessageDto) => {
      if (!hasContent) return;
      if (isSending) return;
      setContent('');

      const prevState = messages;

      setMessages([
        ...prevState,
        {
          ...data,
          _id: randomUUID(),
        },
      ]);

      sendMessageMutation.mutate(data, {
        onSuccess: ({data}) => {
          setMessages([...prevState, data]);
        },
        onError: (err: any) => {
          setMessages(prevState);
          if (err instanceof CanceledError) {
            return;
          }
          Alert.alert(
            'Có lỗi xảy ra khi gửi tin nhắn',
            err.response?.data?.message ?? err.message,
          );
        },
      });
    },
    [hasContent, isSending, messages, sendMessageMutation, setMessages],
  );

  const value: ChatContextType = {
    content,
    setContent,
    sendMessage,
    hasContent,
    inputRef,
    isSending,
    messages,
    setMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
