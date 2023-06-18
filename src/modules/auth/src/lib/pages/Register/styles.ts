import styled from "styled-components";
import loginBg from "../../assets/login-bg.svg";

export const StyledCreateAndEditHr = styled.div`
   display: flex;
   flex-direction: column;
   /* gap: 20px; */
   height: 100%;

   /* .avatar {
      margin: 30px 0;
   } */

   .history {
      font-style: italic;
      font-weight: 400;
      color: #777777;
   }

   .ant-input {
      height: 46px;
   }
`;

export const StyledEditPassword = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;
   margin-top: 10px;
`;

export const GroupButton = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 20px;
   margin-top: 20px;
`;

export const StyledNotFound = styled.div`
   display: flex;
   align-items: center;
   padding: 10px 12px;
   height: 50px;
   font-weight: normal;
   font-size: 15px;
   color: rgba(0, 0, 0, 0.25);
`;

export const StyledExtendOption = styled<any>(StyledNotFound)`
   cursor: pointer;
   transition: background 0.2s ease;
   color: ${(props) => props.theme.textDefault};

   &:hover {
      background-color: ${(props) => props.theme.baseGray02};
   }
`;

export const ContainerLogin = styled.div`
   position: relative;
   display: block;
   height: 100vh;

   &::-webkit-scrollbar {
      width: 6px;
   }

   &::-webkit-scrollbar-track {
      background: #f5f5f5;
      border-radius: 100px;
   }

   &::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.strongBlue};
      border-radius: 100px;
   }
   /* height: auto; */

   background: url(${loginBg}) no-repeat;
   background-size: cover;
   user-select: none;

   label {
      font-size: 15px;
   }

   .label {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
      color: #1b1f3b;
   }

   .legacy {
      height: 170px;
      overflow-y: auto;
      padding: 4px 6px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 0px;

      &::-webkit-scrollbar {
         width: 6px;
      }

      &::-webkit-scrollbar-track {
         background: #f5f5f5;
         border-radius: 100px;
      }

      &::-webkit-scrollbar-thumb {
         background: ${(props) => props.theme.strongBlue};
         border-radius: 100px;
      }

      .title {
         display: block;
         font-weight: 700;
         font-size: 13px;
         text-align: left;
         margin-top: 10px;
         text-transform: uppercase;
      }
   }
`;
export const StyledForm = styled.form`
   padding: 20px 40px 40px 40px;
   background-color: rgb(255 255 255 / 1);
   border-radius: 10px;
   width: 700px;
   height: fit-content;
   margin: auto;
   position: absolute;
   top: 0px;
   right: 0px;
   bottom: 0px;
   left: 0px;
   box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);

   .title {
      font-size: 30px;
      font-weight: 600;
      text-align: center;
      display: block;
      margin-bottom: 10px;
   }
`;
export const StyledLogo = styled.img`
   margin-left: auto;
   margin-right: auto;
   width: 150px;
   height: auto;
   display: block;
   user-select: none;
`;

export const StyledContentConfirm = styled.div`
   .title {
      font-size: 30px;
      font-weight: 500;
      display: block;
      margin-bottom: 10px;
   }

   .sub-title {
      font-size: 16px;
      display: block;
      margin-bottom: 40px;
   }

   .btn-ok {
      margin: 0 auto;
   }
`;
