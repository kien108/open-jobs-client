import styled from "styled-components";
import { IStatus } from "./Status";

export const StyledStatus = styled.div<IStatus>`
   position: relative;
   display: inline-block;
   max-width: 100%;
   cursor: default;
   outline: none;
   text-decoration: none;
   background-color: ${(props) => (props.isActive ? props.theme.green : props.theme.red)};
   padding: 0 16px;
   border-radius: 8px;
   height: 26px;
`;

export const StyledText = styled.span`
   color: ${(props) => props.theme.secondaryText};
   font-size: 13px;
   white-space: pre;
   overflow: hidden;
   text-overflow: ellipsis;
`;
