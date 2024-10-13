export const API = {
  AUTH: {
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
    REGISTER: {
      CHAT_USER: '/auth/register/chat-user',
    },
  },
  ROOM: {
    GET_MESSAGES: (roomId: string) => `/chat-room/${roomId}`,
    DELETE: '/chat-room',
  },
  MESSAGE: {
    SEND: '/message',
    LIKE: (messageId: string) => `/message/${messageId}/like`,
    DISLIKE: (messageId: string) => `/message/${messageId}/dislike`,
  },
  UPLOADER: {
    UPLOAD: '/upload',
    DELETE: (fileId: string) => `/upload?public_id=${fileId}`,
  },
  SHARE: {
    CREATE: '/share',
    GET_SHARED_ROOM: (link: string) => `/share/${link}`,
    CANCEL_SHARE: (link: string) => `/share/${link}`,
    GET_USER_SHARES: '/share',
  },
};
