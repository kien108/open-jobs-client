import { Modal } from "../../../../../../libs/components";
import styled from "styled-components";

export const StyledBtnsHeader = styled.div`
   max-width: 1200px;
   margin: 0 auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-top: 40px;
`;
export const Container = styled.div`
   background: white;
   max-width: 1200px;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   gap: 10px;
   /* padding: 30px 20px; */
   /* padding: 30px 0px; */
   padding-bottom: 10px;
   border: 1px solid #d4d2d0;
   border-radius: 8px;
   box-shadow: none !important;
   margin-top: 20px;
   overflow: hidden;

   .general-container {
      margin-top: 340px;
   }

   .svg-top-layout {
      width: 300px;
      height: 300px;
      position: absolute;
      top: 3px;
      left: 0;

      opacity: 0.2;
   }
   .svg-top {
      position: absolute;
      z-index: 1;
      left: 20px;
      top: 0;
      width: 270px;
      height: 270px;

      svg path {
         fill: #348879;
      }
   }

   .cv-item {
      padding: 0 30px;
      display: block;

      &.p-0 {
         padding: 0px;
      }
   }

   .avatar {
      position: absolute;
      z-index: 2;
      width: 205px;
      height: 205px;
      border-radius: 1000px;
      border: 3.5px solid #348879;
      display: block;
      left: 45%;
      top: 20px;
      transform: translate(-50%);
      background-color: white;

      .sb-avatar {
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
      }
   }

   .header {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 100px;
      margin-top: 50px;

      .name {
         font-size: 40px !important;
         font-weight: 600 !important;
         line-height: 52px;
         color: #030504;
         padding: 5px 0;
         letter-spacing: 2px;
      }

      .job-title {
         border-radius: 20px;
         font-size: 15px;
         font-weight: 400;
         text-transform: uppercase;
         text-align: center;
         color: #348879 !important;
         background-color: #eaf3f1;
         padding: 5px 30px;
      }
   }

   .skills {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin: 20px 0 30px 0;

      .skill {
         border: 1px solid #348879;
         border-radius: 20px;
         padding: 4px 8px;
      }
   }

   .general-information {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      padding-left: 15px;

      .container-input {
         width: 100%;
      }

      .right {
         display: flex;
         flex-direction: column;
         gap: 3px;
         align-self: flex-start;
         border-radius: 8px;
         padding: 20px;
         width: 100%;
         margin-bottom: 20px;

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
      text-transform: uppercase;
      display: flex;
      font-weight: 500;
      color: #fff;
      padding: 2px 20px 2px 0;
      font-size: 18px;
      position: relative;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      min-width: 65%;
      width: fit-content;
      background-color: #348879 !important;
      margin-bottom: 10px;

      span {
         display: block;
         margin-left: 20px;
      }

      &::after {
         content: "";
         display: block;
         position: absolute;
         height: 100%;
         width: 2px;
         background: #fff;
         left: 3px;
         top: 0;
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
   transform: translateX(15px);
   margin-left: auto;
   margin-top: 20px;
   border-radius: 10px;
   transition: all 0.3s;

   &.btn-back {
      margin-left: 0px;
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

export const StyledModalModal = styled(Modal)`
   h1 {
      margin-bottom: 30px !important;
   }

   .preview {
      font-size: 18px;
      display: block;
      margin: 20px 0 -20px 0;
      font-weight: 500;
   }

   .center {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
   }
`;
