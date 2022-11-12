import { Switch } from 'antd';
import styled, { StyledComponent } from 'styled-components';

export const Container = styled.div`
  position: relative;
`;
export const ContainerSwitch = styled.span`
  display: flex;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${(props) => props.theme.textDefault};
  text-align: left;
  display: flex;

  .required-mark {
    color: red;
  }
`;

export const StyledSwitch: StyledComponent<any, any> = styled(Switch)`
  background: ${(props) => props.theme.softBlue};
  box-shadow: inset;
  opacity: 0.9;

  .ant-switch-inner {
    color: ${(props) => props.theme.strongGray};
  }

  &.ant-switch-checked {
    background: ${(props) => props.theme.strongBlue};

    .ant-switch-inner {
      color: ${(props) => props.theme.secondaryText};
    }
  }

  &:focus {
    box-shadow: unset;
  }

  &:hover {
    opacity: 1;
  }
`;

export const CheckedMessage = styled.span`
  font-size: 15px;
  font-weight: 400;
  padding-left: 5px;
  color: ${(props) => props.theme.textDefault};
`;
