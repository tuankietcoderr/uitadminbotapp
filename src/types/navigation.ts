import {NavigationProp} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';

export type ApplicationStackParamList = {
  Redirecting: undefined;
  Onboarding: undefined;
  Chat: {
    roomId: string;
  };
  Saved: undefined;
  Shared: undefined;
  SharedDetail: {
    sharedId: string;
  };
};

export type ApplicationScreenProps<T extends keyof ApplicationStackParamList> =
  StackScreenProps<ApplicationStackParamList, T>;
export type ApplicationNavigationProps =
  NavigationProp<ApplicationStackParamList>;
