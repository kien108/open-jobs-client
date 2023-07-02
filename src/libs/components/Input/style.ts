import { Input, InputNumber, InputNumberProps } from "antd";
import styled, { css, StyledComponent } from "styled-components";

interface InputTextProps {
   error?: any;
   icons?: any;
   height?: string;
   on?: string;
   type?: string;
}

export const Container = styled.div`
   .container-label {
      .forgot-password {
         font-size: 13px;
         font-weight: 500;
         color: ${(props) => props.theme.strongYellow};
      }
   }
`;

export const ContainerInput = styled.div`
   position: relative;

   &:hover {
      .icon-password {
         opacity: 1;
      }
   }
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

export const SubLabel = styled.label<{ isShow?: any; icons?: any }>`
   font-size: ${(props) => (props.isShow ? "13px" : "13px")};
   margin-bottom: 4px;
   color: ${(props) => (props.isShow ? props.theme.colorInput : "rgba(27, 31, 59, 0.65)")};
   text-align: left;
   display: flex;
   position: absolute;
   top: ${(props) => (props.isShow ? "35%" : "50%")};
   transform: translateY(-50%);
   left: ${(props) => (props.icons ? "48px" : "16px")};
   transition: all 0.3s;
   pointer-events: none;
`;

export const defaultInput = css`
   border-radius: 10px;
   height: ${(props: InputTextProps) => (props.height ? props.height : "56px")};
   box-shadow: 0 2px 2px ${(props) => props.theme.boxShadowInput};
   color: ${(props) => props.theme.textDefault};
   background: ${(props) => props.theme.secondaryText};
   border: none;
   padding-left: ${(props: InputTextProps) => (props.icons ? "48px" : "16px")};
   padding-right: ${(props: InputTextProps) => (props.type === "password" ? "48px" : "16px")};
   padding-top: ${(props: InputTextProps) => (props.on ? "25px" : "4px")};

   ${(props) =>
      props.on &&
      css`
         &::placeholder {
            font-size: 0px;
         }

         &:focus {
            &::placeholder {
               font-size: inherit;
            }
         }
      `}
   transition: all 0.2s ease-in-out;
   outline: 1px solid ${(props) => props.theme.borderInput};

   &:hover {
      box-shadow: 0 2px 5px ${(props) => props.theme.boxShadowInputHover};
      border-color: ${(props) => props.theme.borderInput};
   }

   &:focus-visible {
      border: none;
      outline: none;
      box-shadow: none;
   }

   &:focus {
      border: none;
      outline: 2px solid
         ${(props) => (props.error ? props.theme.accentActive : props.theme.strongBlue)};
      box-shadow: none;
   }

   &.input-copy {
      &:focus {
         border: none;
         outline: 2px solid
            ${(props) => (props.error ? props.theme.accentActive : props.theme.borderInput)};
         box-shadow: none;
      }
   }
`;

export const StyledInput: StyledComponent<any, any> = styled(Input)<InputTextProps>`
   ${defaultInput}
`;

export const StyledInputNumber: StyledComponent<any, any> = styled(InputNumber)<
   InputNumberProps & InputTextProps
>`
   width: 100%;
   padding: 0;
   border: none;

   &.ant-input-number-focused {
      border: none;
      box-shadow: none;
   }

   .ant-input-number-input-wrap {
      input {
         width: 100%;
         height: 100%;
         ${defaultInput}
         outline: ${(props) =>
            props.error
               ? "2px solid " + props.theme.accentActive
               : "1px solid " + props.theme.borderInput};
         padding-top: 0;
      }
   }

   .ant-input-number-handler-wrap {
      display: none;
   }
`;

export const StyledInputTextarea: StyledComponent<any, any> = styled(
   Input.TextArea
)<InputTextProps>`
   ${defaultInput};
   padding-top: 16px;
   padding-bottom: 16px;
`;

export const StyledIconInput = styled.span`
   height: 1.5rem;
   width: 1.5rem;
   font-size: 16px;
   cursor: pointer;
   position: absolute;
   top: 50%;
   right: 16px;
   transform: translateY(-50%);
   opacity: 0.7;
   transition: all 0.2s ease-in-out;
`;

export const StyledIconDefault = styled.span`
   z-index: 1;
   height: 1.5rem;
   width: 1.5rem;
   font-size: 16px;
   cursor: pointer;
   position: absolute;
   top: 50%;
   left: 16px;
   transform: translateY(-50%);
   transition: all 0.2s ease-in-out;
`;

export const InputMessageStyled = styled.span`
   font-size: 13px;
   line-height: 20px;
   color: ${(props) => props.theme.red};
   display: inline-block;
   margin-top: 4px;
   width: 100% !important;
   text-align: left;
`;
