import * as React from 'react';
import {Path, SvgProps} from 'react-native-svg';
import IconWrapper from './IconWrapper';
const ChevronDownIcon = (props: SvgProps) => (
  <IconWrapper
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="m6 9 6 6 6-6" />
  </IconWrapper>
);
export default ChevronDownIcon;
