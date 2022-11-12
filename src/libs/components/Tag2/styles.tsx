import styled, { StyledComponent } from 'styled-components';
import { Tag } from 'antd';
import { Props } from './Tag';

export const StyledTag: StyledComponent<any, any> = styled(Tag)<Props>`
  &.ant-tag {
    color: ${(props) => (props.color ? props.color : props.theme.link)};
    background: ${(props) => (props.bg ? props.bg : props.theme.softBlue)};
    font-size: ${(props) => (props.fz ? props.fz : '13px')};
    padding: ${(props) => (props.p ? props.p : '0 8px')};
    line-height: 24px;
    border-radius: ${(props) => (props.rounded ? props.rounded : '8px')};
    border: ${(props) => (props.bordered ? '1px solid #ccc' : 'none')};

    cursor: pointer;
    transition: background 0.2s linear;
    &:hover {
      background: ${(props) => props.theme.softBlueHover};
    }
  }
`;
