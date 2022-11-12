import { Typography } from "antd";
import { ParagraphProps } from "antd/lib/typography/Paragraph";
import { TextProps } from "antd/lib/typography/Text";
import { TitleProps } from "antd/lib/typography/Title";
import styled, { StyledComponent } from "styled-components";
import { defaultFontFamily } from "../../common";

export interface IStyled {
   color?: string;
}

export const StyledTitle: StyledComponent<any, any> = styled(Typography.Title)<
   IStyled & TitleProps
>`
   &.ant-typography {
      ${defaultFontFamily};
      font-weight: 600;
      margin: 0;
      color: ${(props) => (props.color ? props.color : props.theme.textDefaultColor)};

      ${(props) =>
         props.level === 1
            ? "font-size: 30px !important; line-height: 36px"
            : props.level === 2
            ? "font-size: 24px !important; line-height: 32px"
            : props.level === 3
            ? "font-size: 20px !important; line-height: 28px"
            : props.level === 4
            ? "font-size: 18px !important; line-height: 24px"
            : props.level === 5
            ? "font-size: 16px !important; line-height: 20px"
            : "font-size: 30px !important; line-height: 36px"};
   }
`;

export const StyledText: StyledComponent<any, any> = styled(Typography.Text)<IStyled & TextProps>`
   ${defaultFontFamily};
   color: ${(props) => (props.color ? props.color : props.theme.textDefaultColor)};
   font-size: 14px;
   line-height: 20px;
   margin: 0;
`;

export const StyledParagraph: StyledComponent<any, any> = styled(Typography.Paragraph)<
   IStyled & ParagraphProps
>`
   ${defaultFontFamily};
   color: ${(props) => (props.color ? props.color : props.theme.textDefaultColor)};
   font-size: 14px;
   line-height: 20px;
   margin: 0;
`;
