import { DatePicker as AntDatePicker } from "antd";
import { DatePickerProps, RangePickerProps } from "antd/lib/date-picker";
import styled, { css, StyledComponent } from "styled-components";

interface IStyledRangePicker {
   isFocus?: boolean;
}

interface IStyledDatePicker {
   isLabel?: boolean;
   error?: boolean;
   showToday?: boolean;
}

export const ContainerRangePicker = styled.div`
   position: relative;
`;

export const ContainerDatePicker = styled.div`
   position: relative;

   .ant-picker {
      padding-right: 0px !important;

      .ant-picker-suffix {
         cursor: pointer;
      }
   }
`;

export const StyledDatePicker: StyledComponent<any, any> = styled(AntDatePicker)<
   IStyledDatePicker & DatePickerProps
>`
   height: 52px;
   // min-width: 300px;
   width: 100%;
   border-radius: 10px;
   align-items: end;
   align-items: center;
   border-color: ${(props) => props.theme.borderInput};
   box-shadow: 0 2px 2px ${(props) => props.theme.boxShadowInput};
   color: ${(props) => props.theme.textDefault};
   background: ${(props) => props.theme.secondaryText};
   cursor: text;
   ${(props) =>
      !props.isLabel &&
      css`
         align-items: center !important;
      `}

   &:hover {
      border-color: ${(props) => props.theme.borderInput};
      box-shadow: 0 2px 5px ${(props) => props.theme.boxShadowInputHover};
   }

   &.ant-picker-focused {
      border: 2px solid
         ${(props) => (props.error ? props.theme.accentActive : props.theme.strongBlue)} !important;
   }

   .ant-picker-active-bar {
      display: none;
   }

   .ant-picker-input {
      /* width: 85px; */
      align-items: end;
      // pointer-events: none;
   }

   .ant-picker-suffix {
      font-size: 20px;
      position: absolute;
      right: 11px;
      cursor: pointer;
      pointer-events: unset;
      transition: all 0.3s;

      &:hover {
         color: ${(props) => props.theme.strongGray};
      }
   }

   .ant-picker-clear {
      right: 40px;
      margin-top: 1px;
   }
`;

export const StyledRangePicker: StyledComponent<any, any> = styled(AntDatePicker.RangePicker)<
   IStyledRangePicker & RangePickerProps
>`
   height: 55px;
   // min-width: 300px;
   width: 100%;
   border-radius: 10px;
   align-items: end;
   border-color: ${(props) => props.theme.borderInput};
   box-shadow: 0 2px 2px ${(props) => props.theme.boxShadowInput};
   color: ${(props) => props.theme.textDefault};
   background: ${(props) => props.theme.secondaryText};
   cursor: text;

   &:hover {
      border-color: ${(props) => props.theme.borderInput};
      box-shadow: 0 2px 5px ${(props) => props.theme.boxShadowInputHover};
   }

   &.ant-picker-focused {
      border: 2px solid ${(props) => props.theme.strongBlue};
   }

   .ant-picker-active-bar {
      display: none;
   }

   .ant-picker-range-separator {
      opacity: ${(props) => (props.isFocus ? 1 : 0)};
   }

   .ant-picker-input {
      width: 85px;
      align-items: end;
      // pointer-events: none;
   }

   .ant-picker-suffix {
      font-size: 20px;
      position: absolute;
      right: 11px;
      cursor: pointer;
      pointer-events: unset;
      transition: all 0.3s;

      &:hover {
         color: ${(props) => props.theme.strongGray};
      }
   }

   .ant-picker-clear {
      right: 40px;
      margin-top: 1px;
   }
`;

export const Label = styled.label<IStyledRangePicker>`
   position: absolute;
   left: 12px;
   font-size: ${(props) => (props.isFocus ? "13px" : "16px")};
   color: ${(props) => (props.isFocus ? props.theme.primaryText : props.theme.strongGray)};
   top: ${(props) => (props.isFocus ? "30%" : "50%")};
   transform: translateY(-50%);
   transition: all 0.3s;
   pointer-events: none;
`;

export const LabelPicker = styled.label<IStyledRangePicker>`
   left: 12px;
   font-size: 13px;
   color: ${(props) => props.theme.primaryText};
   transform: translateY(-50%);
   transition: all 0.3s;
   pointer-events: none;
   font-weight: 500;

   .required-mark {
      color: red;
   }
`;

export const LabelDatePicker: StyledComponent<any, any> = styled.label<IStyledRangePicker>`
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

export const DateMessageStyled = styled.span`
   font-size: 13px;
   line-height: 20px;
   color: ${(props) => props.theme.red};
   display: inline-block;
   margin-top: 4px;
   width: 100% !important;
   text-align: left;
`;

export const Container: StyledComponent<any, any> = styled.div`
   display: flex;
   flex-direction: column;
`;
