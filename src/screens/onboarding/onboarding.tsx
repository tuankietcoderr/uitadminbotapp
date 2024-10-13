import {AppButton, AppText} from '@/components/common';
import {useCreateChatUserMutation} from '@/services/auth';
import {colors, families} from '@/theme';
import {ApplicationScreenProps} from '@/types';
import React, {useState} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({
  navigation,
}: ApplicationScreenProps<'Onboarding'>) => {
  const createChatUserMutation = useCreateChatUserMutation();
  const [isLastPage, setIsLastPage] = useState(false);
  const isLoading = createChatUserMutation.isPending;

  const onSkip = () => {
    createChatUserMutation.mutate(undefined, {
      onSuccess: ({data, success, message}) => {
        if (success) {
          return navigation.replace('Chat', {
            roomId: data.room,
          });
        }
        Alert.alert('Lỗi', message);
      },
      onError: () => {
        Alert.alert('Lỗi', 'Đã có lỗi xảy ra');
      },
    });
  };

  return (
    <View style={styles.container}>
      <Onboarding
        showDone={false}
        titleStyles={{
          fontFamily: families.extraBold,
          color: '#000',
        }}
        subTitleStyles={{
          fontFamily: families.regular,
        }}
        skipLabel={<AppText>Bỏ qua</AppText>}
        nextLabel={<AppText>Tiếp theo</AppText>}
        skipToPage={2}
        bottomBarColor="#fff"
        pageIndexCallback={index => {
          if (index === 2) {
            setIsLastPage(true);
          } else {
            isLastPage && setIsLastPage(false);
          }
        }}
        DoneButtonComponent={({onPress}) => (
          <AppButton onPress={onPress}>
            <AppText>Hoàn tất</AppText>
          </AppButton>
        )}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.image}
                resizeMode="contain"
              />
            ),
            title: 'Chào mừng bạn đến với UITAdminBot',
            subtitle:
              'UITAdminBot là ứng dụng chatbot hỗ trợ sinh viên UIT trong việc tra cứu thông tin tuyển sinh, học bổng, học phí, lịch học, lịch thi, điểm thi,...',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('@/assets/images/onboarding_1.png')}
                style={styles.image}
                resizeMode="contain"
              />
            ),
            title: 'Ứng dụng chatbot',
            subtitle:
              'UITAdminBot sử dụng công nghệ chatbot\nđể hỗ trợ sinh viên UIT',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('@/assets/images/onboarding_2.png')}
                style={styles.image}
                resizeMode="contain"
              />
            ),
            title: 'Hỗ trợ nhanh chóng',
            subtitle:
              'UITAdminBot sẽ giúp bạn giải đáp mọi thắc mắc\nmột cách nhanh chóng và chính xác 24/7',
          },
        ]}
      />
      {isLastPage && (
        <AppButton
          style={styles.btn}
          onPress={onSkip}
          isLoading={isLoading}
          disabled={isLoading}>
          <AppText color={colors.white}>Khám phá ngay</AppText>
        </AppButton>
      )}
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
  },
  btn: {
    margin: 16,
  },
});
