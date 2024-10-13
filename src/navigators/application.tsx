import {
  ChatScreen,
  OnboardingScreen,
  RedirectingScreen,
  SavedScreen,
  SharedDetailScreen,
  SharedScreen,
} from '@/screens';
import {families} from '@/theme';
import {ApplicationStackParamList} from '@/types';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator} from 'react-native';

const Stack = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer fallback={<ActivityIndicator animating />}>
      <Stack.Navigator
        initialRouteName="Redirecting"
        screenOptions={{
          headerShadowVisible: false,
          headerShown: false,
          headerTitleStyle: {
            fontFamily: families.bold,
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Redirecting" component={RedirectingScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen
          name="Shared"
          component={SharedScreen}
          options={{
            headerShown: true,
            title: 'Các cuộc trò chuyện đã chia sẻ',
          }}
        />
        <Stack.Screen
          name="SharedDetail"
          component={SharedDetailScreen}
          options={{
            headerShown: true,
            title: 'Chi tiết',
          }}
        />
        <Stack.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            headerShown: true,
            title: 'Các tin nhắn đã lưu',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
