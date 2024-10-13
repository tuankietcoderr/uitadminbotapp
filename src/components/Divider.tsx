import {colors} from '@/theme';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

const Divider = ({style}: Props) => {
  return (
    <View
      style={StyleSheet.flatten([
        {
          height: 0.2,
          backgroundColor: colors.gray,
        },
        style,
      ])}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({});
