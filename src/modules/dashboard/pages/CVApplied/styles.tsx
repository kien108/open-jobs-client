import styled from "styled-components";

export const GroupButton = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 20px;
   margin-top: 12px;
`;

export const ContainerTable = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;

   margin-top: 24px;
   padding: 24px;
   box-shadow: 0 0 #000, 0 0 #000, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 0 10px -6px rgb(0 0 0 / 0.1);
   background: ${(props) => props.theme.secondaryText};
   border-radius: 10px;
`;

export const BtnFunction = styled.div`
   cursor: pointer;
   width: 44px;
   height: 44px;
   display: flex;
   align-items: center;
   justify-content: center;

   border-radius: 10px;
   transition: all 0.3s;

   svg {
      path {
         fill: ${(props) => props.theme.blue};
         transition: all 0.3s;
      }
   }

   .icon-password {
      path:first-child {
         fill: #fff;
      }
   }

   &:hover {
      background: ${(props) => props.theme.softBlue};
      svg {
         path {
            fill: ${(props) => props.theme.blueHover};
         }
      }
   }
`;

export const StyledFunctions = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
`;

export const StyledHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-top: 30px;

   button.ant-btn.btn-close {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      width: 32px;
      height: 32px;
      background-color: #ebefff;
      border-radius: 50%;

      svg {
         display: block;
         right: unset;
         top: unset;
         width: 7px;
         height: 7px;
         vertical-align: middle;
         color: #526ed3;
      }

      &:hover {
         background-color: #dfe3f3;
         color: #6c86e2;
      }
   }
`;
