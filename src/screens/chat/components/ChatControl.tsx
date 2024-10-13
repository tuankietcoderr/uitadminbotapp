import {AppButton, AppText} from '@/components/common';
import Divider from '@/components/Divider';
import {BookmarkIcon, ShareIcon, TrashIcon} from '@/components/icons';
import {QUERY_KEY} from '@/constants';
import {useChatContext} from '@/context';
import {useDeleteRoomMutation} from '@/services/room';
import {useCreateShareLinkMutation} from '@/services/share';
import {useBookmarkStore} from '@/store';
import {colors} from '@/theme';
import {ApplicationNavigationProps} from '@/types';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {useClickOutside} from 'react-native-click-outside';

type Props = {
  roomId: string;
};

const ChatControl = ({roomId}: Props) => {
  const deleteRoomMutation = useDeleteRoomMutation();
  const navigation = useNavigation<ApplicationNavigationProps>();
  const {messageIds, clear} = useBookmarkStore();
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const contextRef = useClickOutside<View>(() => {
    setContextMenuVisible(false);
  });
  const shareChatMutation = useCreateShareLinkMutation();
  const {setMessages} = useChatContext();
  const queryClient = useQueryClient();

  const onPressBookmark = () => {
    navigation.navigate('Saved');
  };

  const onPressShare = () => {
    setContextMenuVisible(prev => !prev);
  };

  const onPressShareChat = () => {
    shareChatMutation.mutate(undefined, {
      onSuccess: ({data}) => {
        ToastAndroid.show(
          'Chia sẻ cuộc trò chuyện thành công',
          ToastAndroid.SHORT,
        );
        setContextMenuVisible(false);
        navigation.navigate('SharedDetail', {
          sharedId: data,
        });
      },
      onError: () => {
        ToastAndroid.show(
          'Chia sẻ cuộc trò chuyện thất bại',
          ToastAndroid.SHORT,
        );
      },
    });
  };
  const onPressViewSharedChat = () => {
    setContextMenuVisible(false);
    navigation.navigate('Shared');
  };

  const onPressDeleteRoom = () => {
    Alert.alert(
      'Xoá cuộc trò chuyện',
      'Bạn có chắc chắn muốn xoá cuộc trò chuyện này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: () => {
            ToastAndroid.show(
              'Đang xoá cuộc trò chuyện...',
              ToastAndroid.SHORT,
            );
            deleteRoomMutation.mutate(undefined, {
              onSuccess: ({data}) => {
                ToastAndroid.show(
                  'Xoá cuộc trò chuyện thành công',
                  ToastAndroid.SHORT,
                );
                clear();
                setMessages([]);
                queryClient.invalidateQueries({
                  queryKey: [QUERY_KEY.ROOM.GET_MESSAGES, roomId],
                });
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Chat',
                      params: {
                        roomId: data._id,
                      },
                    },
                  ],
                });
              },
              onError: () => {
                ToastAndroid.show(
                  'Xoá cuộc trò chuyện thất bại',
                  ToastAndroid.SHORT,
                );
              },
            });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo_text.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.acitonContainer}>
        <Pressable onPress={onPressBookmark}>
          <BookmarkIcon color={colors.black} fill={colors.black} />
          {messageIds.length > 0 && (
            <View style={styles.bookmarkNumber}>
              <AppText size={12} color={colors.white} weight="semiBold">
                {messageIds.length > 9 ? '9+' : messageIds.length}
              </AppText>
            </View>
          )}
        </Pressable>
        <Pressable onPress={onPressShare}>
          <ShareIcon color={colors.black} />
          {contextMenuVisible && (
            <View style={styles.contextMenu} ref={contextRef}>
              <AppButton
                variant="clear"
                onPress={onPressShareChat}
                isLoading={shareChatMutation.isPending}
                isDisabled={shareChatMutation.isPending}>
                <AppText>
                  {shareChatMutation.isPending ? 'Đang chia sẻ...' : 'Chia sẻ'}
                </AppText>
              </AppButton>
              <Divider />
              <AppButton variant="clear" onPress={onPressViewSharedChat}>
                <AppText>Cuộc trò chuyện đã chia sẻ</AppText>
              </AppButton>
            </View>
          )}
        </Pressable>
        <Pressable
          onPress={onPressDeleteRoom}
          disabled={deleteRoomMutation.isPending}>
          <TrashIcon color={colors.black} stroke={'red'} opacity={0.6} />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatControl;

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 40,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    zIndex: 4,
  },
  acitonContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  bookmarkNumber: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  contextMenu: {
    position: 'absolute',
    top: '80%',
    right: -4,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: 240,
    overflow: 'hidden',
    elevation: 4,
  },
});
