import * as React from 'react';
import {Circle, Path, SvgProps} from 'react-native-svg';
import IconWrapper from './IconWrapper';
const ShareIcon = (props: SvgProps) => (
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
    <Circle cx={18} cy={5} r={3} />
    <Circle cx={6} cy={12} r={3} />
    <Circle cx={18} cy={19} r={3} />
    <Path d="m8.59 13.51 6.83 3.98m-.01-10.98-6.82 3.98" />
  </IconWrapper>
);
export default ShareIcon;
