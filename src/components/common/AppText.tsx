import {families} from '@/theme';
import React, {forwardRef} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

type Props = {
  weight?: keyof typeof families;
  size?: number;
  color?: string;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  align?: TextStyle['textAlign'];
};

const AppText = forwardRef<Text, Props>(
  (
    {
      children,
      weight = 'regular',
      size = 14,
      color = '#000',
      align = 'left',
      style = {},
    },
    ref,
  ) => {
    return (
      <Text
        ref={ref}
        style={StyleSheet.flatten([
          {
            fontFamily: families[weight],
            fontSize: size,
            color,
            textAlign: align,
          },
          style,
        ])}>
        {children}
      </Text>
    );
  },
);

export default AppText;
