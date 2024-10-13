import {
  useDislikeMessageMutation,
  useLikeMessageMutation,
} from '@/services/message';
import {useBookmarkStore} from '@/store';
import {colors} from '@/theme';
import {EContentType} from '@/types/enums';
import {Message} from '@/types/schema';
import {formatDate} from '@/utils';
import React, {memo, useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {TypingAnimation} from 'react-native-typing-animation';
import Divider from './Divider';
import MarkdownRenderer from './MarkdownRenderer';
import {AppText} from './common';
import {BookmarkIcon, DisLikeIcon, LikeIcon} from './icons';

type Props = {
  message: Message;
  showAction?: boolean;
};

const ChatItem = ({message, showAction = true}: Props) => {
  return (
    <View style={styles.container}>
      <Question message={message} />
      <Answer message={message} showAction={showAction} />
    </View>
  );
};

export default memo(ChatItem);

type QuestionProps = {
  message: Message;
};
const Question = ({message}: QuestionProps) => {
  const file = message.question?.extra?.file;
  const contentType = message.question.contentType;
  const fileName = file ? file.split('/').pop() : 'file';
  return (
    <View
      style={{
        alignSelf: 'flex-end',
        gap: 4,
        alignItems: 'flex-end',
      }}>
      {file &&
        (contentType === EContentType.IMAGE ? (
          <Image
            source={{uri: file}}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Pressable
            onPress={() => {
              Linking.openURL(file);
            }}>
            <AppText weight="bold" color={colors.main}>
              {fileName}
            </AppText>
          </Pressable>
        ))}
      <View style={[styles.wrapper, styles.question]}>
        <AppText color={colors.white}>{message.question?.content}</AppText>
        <AppText color={'#D1D5DB'} size={10}>
          vào {formatDate(message.createdAt!, 'LLL')}
        </AppText>
      </View>
    </View>
  );
};

type AnswerProps = {
  message: Message;
  showAction?: boolean;
};
const Answer = ({message, showAction}: AnswerProps) => {
  const hasAnswer = message.answer?.content;
  const responseTime = (message.responseTime || 0) / 1000;
  const [isLike, setIsLike] = useState(message.isLiked);
  const [isDislike, setIsDislike] = useState(message.isDisliked);
  const {addBookmark, removeBookmark, isExist} = useBookmarkStore();
  useEffect(() => {
    setIsLike(message.isLiked);
    setIsDislike(message.isDisliked);
  }, [message]);

  const likeMutation = useLikeMessageMutation();
  const dislikeMutation = useDislikeMessageMutation();

  const onLike = () => {
    let isLiked = isLike;
    setIsLike(!isLiked);
    setIsDislike(false);
    likeMutation.mutate(message._id!, {
      onError: () => {
        setIsLike(isLiked);
        setIsDislike(false);
      },
    });
  };
  const onDislike = () => {
    const isDisliked = isDislike;
    setIsLike(false);
    setIsDislike(!isDisliked);
    dislikeMutation.mutate(message._id!, {
      onError: () => {
        setIsLike(false);
        setIsDislike(isDisliked);
      },
    });
  };

  const isBookmarked = isExist(message._id!);

  const onSave = () => {
    if (isBookmarked) {
      removeBookmark(message._id!);
      ToastAndroid.show('Đã bỏ lưu tin nhắn', ToastAndroid.SHORT);
      return;
    }
    addBookmark(message._id!);
    ToastAndroid.show('Đã lưu tin nhắn', ToastAndroid.SHORT);
  };

  return (
    <View style={{flexDirection: 'row', gap: 4}}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.wrapper, styles.answer]}>
        {hasAnswer && (
          <AppText color={colors.darkGray} size={12}>
            Đã trả lời trong{' '}
            <AppText weight="bold" size={12} color={colors.darkGray}>
              {responseTime.toFixed(4)}
            </AppText>{' '}
            giây
          </AppText>
        )}
        {hasAnswer && (
          <MarkdownRenderer>{message.answer?.content}</MarkdownRenderer>
        )}
        {!hasAnswer && (
          <View style={styles.responding}>
            <TypingAnimation
              dotColor={colors.gray}
              dotMargin={4}
              dotRadius={2}
            />
            <AppText color={colors.gray}>UITAdminBot đang trả lời...</AppText>
          </View>
        )}
        {hasAnswer && showAction && (
          <Divider
            style={{
              marginVertical: 10,
              height: 1,
            }}
          />
        )}
        {hasAnswer && showAction && (
          <View style={styles.actionContainer}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              <Pressable onPress={onLike}>
                <LikeIcon
                  stroke={isLike ? colors.success : colors.black}
                  size={20}
                />
              </Pressable>
              <Pressable onPress={onDislike}>
                <DisLikeIcon
                  stroke={isDislike ? colors.error : colors.black}
                  size={20}
                />
              </Pressable>
            </View>
            <Pressable onPress={onSave}>
              <BookmarkIcon
                stroke={colors.black}
                size={20}
                fill={isBookmarked ? colors.black : 'transparent'}
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  wrapper: {
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  question: {
    alignSelf: 'flex-end',
    backgroundColor: colors.main,
    gap: 4,
    maxWidth: '80%',
  },
  answer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.lightGray,
    maxWidth: '80%',
  },
  responding: {
    flexDirection: 'row',
    gap: 30,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  logoContainer: {
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
