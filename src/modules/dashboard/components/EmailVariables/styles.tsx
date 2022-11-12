import styled, { StyledComponent } from 'styled-components';

export const StyledEmailVariables: StyledComponent<any, any> = styled.div``;

export const StyledVariablesContent: StyledComponent<any, any> = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;

  .content {
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    gap: 4px 8px;

    .ant-tag {
      margin-right: 0px;
    }
  }

  label {
    align-self: flex-start;
    width: fit-content;
    font-weight: 400;
    font-size: 15px;
  }
`;

export const Label: StyledComponent<any, any> = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${(props) => props.theme.textDefault};
  text-align: left;
  display: flex;

  .required-mark {
    color: red;
  }
`;

export const StyledErrorMessage: StyledComponent<any, any> = styled.span`
  font-size: 13px;
  line-height: 20px;
  color: ${(props) => props.theme.red};
  display: inline-block;
  margin-top: 4px;
  width: 100% !important;
  text-align: left;
`;
