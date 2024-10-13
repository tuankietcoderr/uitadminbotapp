import {AppText} from '@/components/common';
import {ChevronRightIcon} from '@/components/icons';
import {colors} from '@/theme';
import {ApplicationNavigationProps} from '@/types';
import {Share} from '@/types/schema';
import {formatDate} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

type Props = {
  share: Share;
};

const ShareItem = ({share}: Props) => {
  const navigation = useNavigation<ApplicationNavigationProps>();
  const onPress = () => {
    navigation.navigate('SharedDetail', {sharedId: share._id!});
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={{flex: 1, gap: 4}}>
        <AppText weight="bold" size={16}>
          {share._id}
        </AppText>
        <AppText size={12}>
          Tạo lúc: {formatDate(share.createdAt!, 'LLLL')}
        </AppText>
        <AppText size={12}>
          Hết hạn lúc: {formatDate(share.expiredAt!, 'LLLL')}
        </AppText>
      </View>
      <ChevronRightIcon stroke={colors.black} />
    </Pressable>
  );
};

export default ShareItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
});
