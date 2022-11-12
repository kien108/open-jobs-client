import { Checkbox } from "antd";
import styled, { StyledComponent } from "styled-components";
import { CheckboxProps } from "./Checkbox";

export const StyledCheckbox: StyledComponent<any, any> = styled(Checkbox)<CheckboxProps>`
   pointer-events: ${(props) => (props.readonly ? "none" : "inherit")};
   display: inline-flex;
   align-items: center;

   &:hover {
      .ant-checkbox-disabled .ant-checkbox-inner {
         background-color: ${(props) => props.theme.borderInput};
      }

      .ant-checkbox-inner {
         background-color: ${(props) => props.theme.yellow};
         border-color: ${(props) => props.theme.deepGray};
      }

      .ant-checkbox-checked {
         .ant-checkbox-inner {
            background-color: ${(props) => props.theme.yellow};
         }
      }
   }

   .ant-checkbox:hover .ant-checkbox-inner,
   .ant-checkbox-input:focus + .ant-checkbox-inner {
      border-color: ${(props) => props.theme.deepGray};

      &::after {
         border-color: ${(props) => props.theme.black};
      }
   }

   .ant-checkbox-inner {
      border-radius: 8px;
      width: 24px;
      height: 24px;
      line-height: 20px;
      position: relative;

      &::after {
         position: absolute;
         left: 6px;
         top: 10px;
         height: 14px;
         width: 8px;
         margin-bottom: 10px;
         border-color: ${(props) => props.theme.black};
      }
   }

   .ant-checkbox::after {
      border: none;
   }

   .ant-checkbox {
      top: 0;
   }

   .ant-checkbox + span {
      padding: 0;
      word-wrap: break-word;
      margin-left: 12px;
      font-size: 15px;
      line-height: 24px;
      font-weight: 600;
   }

   .ant-checkbox-checked .ant-checkbox-inner {
      border: none;
      background-color: ${(props) => props.theme.yellow};
   }

   .ant-checkbox-disabled .ant-checkbox-inner {
      cursor: default;
      border: none;
      background-color: ${(props) => props.theme.borderInput};
   }
`;
