import {useChatContext} from '@/context';
import {useGetMeQuery} from '@/services/auth';
import {useGetRoomMessagesMutation} from '@/services/room';
import {ApplicationScreenProps} from '@/types';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, ToastAndroid, View} from 'react-native';

const RedirectingScreen = ({
  navigation,
}: ApplicationScreenProps<'Redirecting'>) => {
  const {setMessages} = useChatContext();
  const {isSuccess, data, isError} = useGetMeQuery();
  const getRoomMessagesMutation = useGetRoomMessagesMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data && data.success) {
        getRoomMessagesMutation.mutate(data.data.room, {
          onSuccess: ({data: roomData, success}) => {
            if (success) {
              setMessages(roomData);
              ToastAndroid.show(
                'Chào mừng bạn quay trở lại',
                ToastAndroid.SHORT,
              );
              navigation.replace('Chat', {
                roomId: data.data.room,
              });
            }
          },
          onError: () => {
            ToastAndroid.show('Đã có lỗi xảy ra', ToastAndroid.SHORT);
            navigation.replace('Onboarding');
          },
        });
        return;
      }
    }
    if (isError) {
      navigation.replace('Onboarding');
    }
  }, [data, isError, isSuccess, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default RedirectingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
