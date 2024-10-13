import ChatItem from '@/components/ChatItem';
import {AppText} from '@/components/common';
import {useChatContext} from '@/context';
import {colors} from '@/theme';
import {ApplicationScreenProps} from '@/types';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChatArea from './components/ChatArea';
import ChatControl from './components/ChatControl';

const _questions = [
  'Cách lấy thẻ sinh viên',
  'Thủ tục nhập học',
  'Học phí',
  'Học bổng',
  'Chương trình học',
  'Học phần',
  'Điểm thi',
  'Các khoa đào tạo',
  'Các môn học',
  'Chương trình tiên tiến',
  'Phương thức xét tuyển',
  'Tuyển thẳng',
  'Hệ đào tạo',
  'Thông tin liên hệ',
];

const ChatScreen = ({navigation, route}: ApplicationScreenProps<'Chat'>) => {
  const {roomId} = route.params;
  const {messages, setContent, content} = useChatContext();
  const listRef = useRef<FlatList>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      listRef.current?.scrollToEnd({animated: false});
    }
  }, [mounted]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <ChatControl roomId={roomId} />
      <View style={{flex: 1}}>
        <FlatList
          ref={listRef}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() => {
            listRef.current?.scrollToEnd({animated: false});
          }}
          data={messages}
          renderItem={({item}) => <ChatItem message={item} />}
          keyExtractor={item => item._id!}
          ListFooterComponent={<View style={{height: 20}} />}
          ListEmptyComponent={
            <View style={styles.suggestContainer}>
              {_questions.map((question, index) => (
                <Pressable
                  key={index}
                  onPress={() => setContent(question)}
                  style={[
                    styles.suggest,
                    {
                      backgroundColor:
                        content === question ? colors.main : colors.lightGray,
                    },
                  ]}>
                  <AppText
                    key={index}
                    color={content === question ? colors.white : colors.black}>
                    {question}
                  </AppText>
                </Pressable>
              ))}
            </View>
          }
        />
        {!mounted && (
          <View
            style={{
              flex: 1,
              ...StyleSheet.absoluteFillObject,
              backgroundColor: colors.white,
            }}>
            <ActivityIndicator size="large" style={{flex: 1}} />
          </View>
        )}
      </View>
      <View>
        <ChatArea roomId={roomId} />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  chatContainer: {
    paddingHorizontal: 10,
    gap: 10,
    paddingTop: 10,
  },
  suggestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  suggest: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 40,
  },
});
