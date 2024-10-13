import {AppText} from '@/components/common';
import {useChatContext} from '@/context';
import {useBookmarkStore} from '@/store';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import BookmarkItem from './components/BookmarkItem';

const SavedScreen = () => {
  const {messageIds} = useBookmarkStore();
  const {messages} = useChatContext();
  const savedMessages = messages.filter(message =>
    messageIds.includes(message._id!),
  );
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={savedMessages}
        keyExtractor={item => item._id!}
        renderItem={({item}) => <BookmarkItem message={item} />}
        contentContainerStyle={{padding: 16, gap: 8}}
        ListEmptyComponent={
          <AppText align="center">Không có tin nhắn đã lưu</AppText>
        }
      />
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({});
