import {colors, families} from '@/theme';
import React, {PropsWithChildren} from 'react';
import Markdown, {MarkdownProps} from 'react-native-markdown-display';

const markdownStyles = {
  body: {
    fontFamily: families.regular,
    color: '#000',
  },
  heading1: {
    fontFamily: families.bold,
  },
  heading2: {
    fontFamily: families.bold,
  },
  heading3: {
    fontFamily: families.bold,
  },
  heading4: {
    fontFamily: families.bold,
  },
  heading5: {
    fontFamily: families.bold,
  },
  heading6: {
    fontFamily: families.bold,
  },

  list_item: {
    fontFamily: families.medium,
    color: '#000',
  },
  link: {
    fontFamily: families.bold,
    color: colors.main,
  },
};

const MarkdownRenderer = (props: PropsWithChildren<MarkdownProps>) => {
  return (
    <Markdown
      {...props}
      style={{
        ...markdownStyles,
        ...props.style,
      }}
    />
  );
};

export default MarkdownRenderer;
