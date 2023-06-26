import styled from "styled-components";

export const Container = styled.div`
   max-width: 1200px;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   gap: 10px;
   padding: 30px 20px;
   border: 1px solid #d4d2d0;
   border-radius: 8px;
   box-shadow: none !important;
   margin-top: 40px;
   background-color: white;

   .job-detail {
      position: relative;
      &::before {
         display: block;
         position: absolute;
         content: "";
         right: 0px;
         border-right: 2px solid ${(props) => props.theme.strongBlue};
         height: 100%;
      }
   }

   .cv-item {
      display: flex;
      flex-direction: column;
      width: 100%;

      .title {
         font-size: 16px;
         text-transform: uppercase;
         font-weight: 600;
         margin-bottom: 4px;
         color: #1b1f3b;
         text-align: left;
         color: ${(props) => props.theme.strongBlue};
      }
   }

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
         position: relative;

         &::before {
            font-size: 15px;
            color: ${(props) => props.theme.strongBlue};
            content: "Trả phí để xem thông tin liên lạc";
            position: absolute;
            inset: 0;
            background-color: #ccc;
            border: 1px solid #d4d2d0;
            border-radius: 8px;
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
         }

         &.hidden {
            &::before {
               display: flex;
            }
         }

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
      }
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
   margin-top: 20px;
   border-radius: 10px;
   transition: all 0.3s;

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
   margin-top: 30px;
`;
