import ChatItem from '@/components/ChatItem';
import {AppText} from '@/components/common';
import {useGetSharedRoomQuery} from '@/services/share';
import {ApplicationScreenProps} from '@/types';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';

const SharedDetailScreen = ({
  route,
}: ApplicationScreenProps<'SharedDetail'>) => {
  const {sharedId} = route.params;
  const {isLoading, data} = useGetSharedRoomQuery(sharedId);
  const messages = data?.data.messages || [];
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList
            contentContainerStyle={styles.chatContainer}
            data={messages}
            renderItem={({item}) => (
              <ChatItem message={item} showAction={false} />
            )}
            keyExtractor={item => item._id!}
            ListFooterComponent={<View style={{height: 20}} />}
            ListEmptyComponent={
              <AppText align="center">
                Không có tin nhắn nào trong cuộc trò chuyện này
              </AppText>
            }
          />
        </View>
      )}
    </View>
  );
};

export default SharedDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatContainer: {
    paddingHorizontal: 10,
    gap: 10,
    paddingTop: 10,
  },
});
