import { Select, Typography } from 'antd';
import styled, { css, StyledComponent } from 'styled-components';

export const Container = styled.div<{ isError?: boolean | undefined }>`
  position: relative;

  .ant-select-status-error.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: ${(props) => props.theme.accentActive} !important;
    border-width: 2px !important;
  }
`;

export const StyledSelect: any = styled(Select)<{ item?: string; mode?: string }>`
  z-index: 0;
  width: 100%;

  .ant-select-selector,
  input {
    border-radius: 10px !important;

    &.ant-select-selection-search-input {
      border: none !important;
    }
  }

  .ant-select-selector {
    min-height: 56px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  span {
    text-align: left;
  }

  .ant-select-selector {
    box-shadow: 0 2px 2px #0000001a;

    &:hover {
      border-color: ${(props) => props.theme.deepGray} !important;
      box-shadow: 0 2px 5px #00000029 !important;
    }

    &:focus,
    &:focus-within {
      border: 2px solid ${(props) => props.theme.strongBlue} !important;
      box-shadow: none !important;
    }

    .dnone {
      display: none !important;
    }
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    transition: none;
  }

  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border: none;
    outline: 2px solid #000;
    box-shadow: none !important;
  }

  .ant-select-arrow {
    font-size: 18px;
    cursor: pointer;

    &:hover {
      border: 2px solid ${(props) => props.theme.strongBlue} !important;
    }
  }

  .ant-select-clear {
    background-color: transparent;
    margin-top: -8px !important;
    font-size: 18px;
    margin-left: 24px;
  }

  .ant-select-selector:focus-within ~ .ant-select-arrow {
    transition: transform 400ms ease !important;
    transform: rotate(-180deg) !important;
  }

  .anticon-close-circle {
    transform: translateX(-30px);
  }

  .ant-select-selection-item {
    padding-top: ${(props) =>
      !props.mode && props.item !== 'true'
        ? '8px !important'
        : !props.mode && props.item === 'true' && '12px !important'};
    margin-top: ${(props) => props.item !== 'true' && '18px !important'};
    margin-left: ${(props) => props.mode && '8px !important'};
  }

  .ant-select-selection-placeholder {
    margin-top: ${(props) => (!props.mode ? '22px' : '12px')};
    margin-top: ${(props) => props.item === 'true' && '0px !important'};
    ${(props) =>
      props.item === 'true' &&
      !props.mode &&
      css`
        display: flex;
        justify-content: start;
        align-items: center;
      `}
  }

  .ant-select-selection-search > .ant-select-selection-search-input {
    padding-top: ${(props) => props.item !== 'true' && '20px !important'};
    margin-top: ${(props) => props.item === 'true' && props.mode && '-4px !important'};
  }
`;

export const StyledLabelSelect: StyledComponent<any, any> = styled(Typography)<{
  ismovetext: string;
}>`
  z-index: 999;
  position: absolute;
  color: ${(props) => props.theme.strongGray};
  text-align: left !important;
  ${(props) =>
    props.ismovetext === 'true'
      ? css`
          transform: translateY(70%);
          font-size: 15px !important;
        `
      : css`
          transform: translateY(26%);
          font-size: 13px !important;
        `};

  padding-left: 12px;
  transition: all 0.3s;
  pointer-events: none;
`;

export const StyledTitleSelect = styled.label`
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

export const InputMessageStyle = styled.span<{
  error: boolean | undefined;
}>`
  margin-bottom: 22px;
  text-align: left;
  font-size: 13px;
  color: ${(props) => props.theme.red};
  display: ${(props) => (props.error ? 'inline-block' : 'none')};
  margin-top: 5px;
  width: 100% !important;
`;
