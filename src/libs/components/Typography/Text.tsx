import { TextProps } from 'antd/lib/typography/Text';
import { FC } from 'react';
import { IStyled, StyledText } from './styles';

const Text: FC<IStyled & TextProps> = (props) => {
  return <StyledText {...props} />;
};

export default Text;
