import styled from "styled-components";

export const StyledBtnsHeader = styled.div`
   max-width: 1200px;
   margin: 0 auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-top: 30px;
`;
export const Container = styled.div`
   .new-skill {
      cursor: pointer;
      display: block;
      background: red;

      &:hover {
         background: #ccc;
      }
   }

   background: white;
   max-width: 1200px;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   gap: 10px;
   padding: 30px 20px;
   border: 1px solid #d4d2d0;
   border-radius: 8px;
   box-shadow: none !important;
   margin-top: 20px;

   .general-information {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;

      .container-input {
         width: 100%;
      }

      .right {
         display: flex;
         flex-direction: column;
         gap: 3px;
         align-self: flex-start;
         border: 1px solid #d4d2d0;
         border-radius: 8px;
         padding: 10px;
         width: 100%;

         .item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: rgb(109, 109, 109);
            font-size: 16px;
         }

         .name {
            font-size: 1.4375rem;
            line-height: 2.25rem;
            font-weight: 500;
            letter-spacing: 1px;
            color: #302f2f;
         }

         span {
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: rgb(45, 45, 45);
         }
      }
   }

   .container,
   .extraInformation {
      display: flex;
      gap: 30px;
      flex-direction: column;

      label {
         font-size: 16px;
         text-transform: uppercase;
         color: ${(props) => props.theme.strongBlue};
      }
   }

   .title {
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 4px;
      color: #1b1f3b;
      text-align: left;
      color: ${(props) => props.theme.strongBlue};
   }

   .skills {
      .skills-title {
         font-size: 16px;
         text-transform: uppercase;
         font-weight: 600;
      }

      label {
         font-size: 14px;
         text-transform: unset;
      }
   }

   .btn-add {
      margin-left: auto;
      width: fit-content;
      margin-top: 20px;
      cursor: pointer;
   }

   .ant-table-content {
      max-height: 300px;
      overflow: auto;

      &::-webkit-scrollbar {
         width: 4px;
      }

      &::-webkit-scrollbar-track {
         background: #fff;
         border-radius: 100px;
      }

      &::-webkit-scrollbar-thumb {
         background: ${(props) => props.theme.scrollbar};
         border-radius: 100px;
      }
   }

   .btn-save {
      width: fit-content;
      margin: 30px auto;
   }
`;

export const BtnFunction = styled.div`
   cursor: pointer;
   width: 44px;
   height: 44px;
   display: flex;
   align-items: center;
   justify-content: center;
   color: black;
   transform: translateX(15px);
   margin-left: auto;
   margin-top: 20px;
   border-radius: 10px;
   transition: all 0.3s;

   &.btn-back {
      margin-left: 140px;
      margin-top: 90px;
   }

   &.btn-remove {
      margin-top: 0px;
      transform: translateX(0);
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

export const StyledListUnits = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;
   max-height: 200px;
   overflow-y: auto;
   padding: 2px;
   margin-top: -15px;

   &::-webkit-scrollbar {
      width: 4px;
   }

   &::-webkit-scrollbar-track {
      background: #fff;
      border-radius: 100px;
   }

   &::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.scrollbar};
      border-radius: 100px;
   }
`;

export const GroupButton = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 20px;
   margin-top: 12px;
`;
