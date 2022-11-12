import { TitleProps } from 'antd/lib/typography/Title';
import { FC } from 'react';
import { IStyled, StyledTitle } from './styles';

const Title: FC<IStyled & TitleProps> = (props) => {
  return <StyledTitle {...props} />;
};

export default Title;
