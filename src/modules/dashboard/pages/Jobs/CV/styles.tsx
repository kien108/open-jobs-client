import styled from "styled-components";

export const GroupButton = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 20px;
   margin-top: 12px;
`;

export const Container = styled.div`
   .pay {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: 80px;
      font-size: 30px;
      text-align: center;

      .premium {
         color: ${(props) => props.theme.strongBlue};
         cursor: pointer;
      }

      .btn-upgrade {
         margin-top: 20px;
         display: flex;
         align-items: center;
         gap: 10px;
         svg {
            margin-top: -8px;
         }
      }
   }

   .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
   }

   .job {
      padding: 16px 20px;
      background: white;
      box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      width: fit-content;
      margin-top: 10px;

      display: flex;
      gap: 10px;
      flex-direction: column;

      .job-title {
         color: ${(props) => props.theme.strongBlue};
         font-weight: 500;
      }
      .item {
         display: flex;
         align-items: center;
         gap: 10px;

         .label {
            min-width: 60px;
         }
      }
   }

   .btn-export {
      width: fit-content;
      margin-left: auto;
      margin-top: 20px;
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

   .badge-status {
      border-radius: 8px;
      text-align: center;
      padding: 6px 4px;
      font-size: 13px;

      &.NEW {
         background-color: yellow;
      }

      &.ACCEPTED {
         background: ${(props) => props.theme.strongBlue};
         color: white;
      }

      &.REJECTED {
         background: red;
      }

      &.HIDDEN {
         background: #ccc;
      }
   }
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
      padding: 4px 8px;
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

   .title {
      color: ${(props) => props.theme.strongBlue};
      font-weight: 500;
   }

   /* .col,
   .ant-table-column-title {
      font-weight: 600;
      font-size: 17px;
   } */
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
