import styled, { css, StyledComponent } from "styled-components";
import { Button } from "antd";
import "./style.scss";
import { ButtonProps } from "./Button";

const svgCss = css`
   right: 10px;
   position: relative;
`;

const disabledCss = css`
   text-shadow: none;
   box-shadow: none;
`;

export const StyledButton: StyledComponent<any, any> = styled(Button)<ButtonProps>`
   &.ant-btn {
      box-shadow: none;
      display: block;
      outline: none;
      border: none;
      text-align: center;
      box-sizing: border-box;
      height: ${(props) => (props.height ? `${props.height}px` : "57px")};
      border-radius: 10px;
      font-size: 15px;

      &:before {
         display: none;
      }

      ${(props) =>
         props.icon !== undefined &&
         `
        span{
          position: relative;
          top: ${props.loading ? "0" : "-3px"};
        }
      `}
      ${(props) =>
         props.border === "default" &&
         `
        background-color: ${props.theme.strongBlue};
        padding: ${
           props.size === "large" ? `0 100px` : props.size === "middle" ? `0 64px` : `0 36px`
        };
        color: ${props.theme.secondaryText};
        font-weight: 700;
        cursor: ${props.disabled ? "not-allowed" : "pointer"};
        :hover {
          background-color: ${props.theme.deepBlue};
        }
        :active {
          background-color: ${props.theme.activeBlue};
        }
        &.ant-btn[disabled],
        &.ant-btn[disabled]:hover,
        &.ant-btn[disabled]:active {
          color: ${props.theme.secondaryText};
          border-color: ${props.theme.strongGray};
          background: ${props.theme.strongGray};
          ${disabledCss}
        }
        svg {
          ${svgCss}
          top: ${props.loading ? "0" : "4px"};
        }
      `}
    ${(props) =>
         props.border === "outline" &&
         `
        background-color: ${props.theme.secondaryText};
        padding: ${
           props.size === "large" ? `0 100px` : props.size === "middle" ? `0 64px` : `0 36px`
        };
        color: ${props.theme.strongBlue};
        font-weight: 600;
        border: ${props.loading ? `solid 2px` : `solid 2px ${props.theme.strongBlue}`};
        cursor: ${props.disabled ? "not-allowed" : "pointer"};
        &.ant-btn[disabled],
        &.ant-btn[disabled]:hover,
        &.ant-btn[disabled]:active {
          ${disabledCss}
          color: ${props.theme.strongGray};
          border-color: ${props.theme.strongGray};
          background-color: ${props.theme.secondaryText};
        }
        svg {
          ${svgCss}
          top: ${props.loading ? "0" : "4px"};
          path {
            fill: ${props.disabled ? props.theme.strongGray : props.theme.strongBlue};
          }
        }
      `}

    ${(props) =>
         props.border === "borderless" &&
         `
        background-color: inherit;
        padding: ${
           props.size === "large" ? `0 100px` : props.size === "middle" ? `0 64px` : `0 36px`
        };
        color: ${props.theme.activeBlue};
        font-weight: 600;
        border: none;
        cursor: ${props.disabled ? "not-allowed" : "pointer"};
        :hover {
          background-color: ${props.theme.borderInput};
        }
        &.ant-btn[disabled],
        &.ant-btn[disabled]:hover,
        &.ant-btn[disabled]:active {
          ${disabledCss}
          color: ${props.theme.strongGray};
          border-color: ${props.theme.strongGray};
          background-color: ${props.theme.borderInput};
        }
        svg {
          ${svgCss}
          top: ${props.loading ? "0px" : "3px"};
          path {
            fill: ${props.disabled ? props.theme.strongGray : props.theme.activeBlue};
          }
        }
    `}

${(props) =>
         props.border === "cancel" &&
         `
      border: none !important;
      background: #ebefff ;
      color: #526ed3 ;
      padding: 0 24px;
      border-radius: 10px;
      height: 44px;
      cursor: pointer;

      span {
        font-weight: 600;
      }

      svg {
        path {
          stroke: #526ed3 !important;
        }
      }

      &:hover {
        background: #dfe3f3 !important;
      }
    `}
   }
`;
