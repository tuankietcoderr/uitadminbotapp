import {APP_CONFIG, zustandStorage} from '@/utils';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

type BookmarkStoreState = {
  messageIds: string[];
};
type BookmarkStoreActions = {
  addBookmark: (messageId: string) => void;
  removeBookmark: (messageId: string) => void;
  isExist: (messageId: string) => boolean;
  clear: () => void;
};

export const useBookmarkStore = create<
  BookmarkStoreState & BookmarkStoreActions
>()(
  persist(
    (set, get) => ({
      messageIds: [],
      addBookmark: messageId =>
        set(state => ({messageIds: [...state.messageIds, messageId]})),
      removeBookmark: messageId =>
        set(state => ({
          messageIds: state.messageIds.filter(id => id !== messageId),
        })),
      isExist: messageId => get().messageIds.includes(messageId),
      clear: () => set({messageIds: []}),
    }),
    {
      name: APP_CONFIG.STORAGE_KEY.BOOKMARKS,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
