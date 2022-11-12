import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { FC } from 'react';
import { IStyled, StyledParagraph } from './styles';

const Paragraph: FC<IStyled & ParagraphProps> = (props) => {
  return <StyledParagraph {...props} />;
};

export default Paragraph;
