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

   .status {
      display: block;
      padding: 4px 0px;
      border-radius: 10px;
      color: white;
      text-align: center;
      &.ACCEPTED {
         background-color: green;
      }

      &.NEW {
         background-color: #d1d103;
      }

      &.REJECTED {
         background-color: red;
      }
   }

   .match-cv {
      font-weight: 700;
      font-size: 17px;
      color: green;
      text-align: center;
   }

   .col,
   .ant-table-column-title {
      font-weight: 600;
      font-size: 17px;
   }
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

export const Container = styled.div`
   .btn-export {
      width: fit-content;
      margin-left: auto;
   }
   .items {
      display: flex;
      align-items: center;
      gap: 50px;
      margin-top: 30px;

      .item {
         flex-basis: 33.33%;
         height: 150px;
         padding: 10px 20px;
         border-radius: 20px;
         display: flex;
         flex-direction: column;
         justify-content: center;
         box-shadow: 0 0 #000, 0 0 #000, 0 20px 25px -5px rgb(0 0 0 / 0.1),
            0 0 10px -6px rgb(0 0 0 / 0.1);

         span {
            display: block;
            font-size: 30px;
            font-weight: 700;
            text-align: center;
            color: black;

            &.value {
               font-size: 40px;
            }
         }

         &.accepted {
            background-color: green;
         }

         &.new {
            background-color: #d1d103;
         }

         &.rejected {
            background-color: red;
         }

         &.total {
            background-color: white;
         }
      }
   }
`;
