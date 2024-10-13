import {AppText} from '@/components/common';
import {ChevronDownIcon} from '@/components/icons';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import {colors} from '@/theme';
import {Message} from '@/types/schema';
import {formatDate} from '@/utils';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

type Props = {
  message: Message;
};

const BookmarkItem = ({message}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const onPress = () => {
    setIsExpanded(prev => !prev);
  };
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={[
          styles.expand,
          {
            borderBottomWidth: isExpanded ? 1 : 0,
          },
        ]}>
        <View style={{flex: 1}}>
          <AppText weight="bold" size={16}>
            {message.question.content}
          </AppText>
          <AppText size={12}>
            Vào {formatDate(message.createdAt!, 'LLLL')}
          </AppText>
        </View>
        <ChevronDownIcon
          stroke={colors.black}
          style={{
            transform: [{rotate: isExpanded ? '180deg' : '0deg'}],
          }}
        />
      </Pressable>
      {isExpanded && (
        <View style={styles.qaContainer}>
          <MarkdownRenderer>{message.answer?.content}</MarkdownRenderer>
        </View>
      )}
    </View>
  );
};

export default BookmarkItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  expand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: colors.lightGray,
  },
  qaContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
