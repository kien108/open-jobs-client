import styled from "styled-components";

export const BtnFunction = styled.div`
   cursor: pointer;
   width: 44px;
   height: 44px;
   display: flex;
   align-items: center;
   justify-content: center;
   color: black;
   transform: translateX(-10px);

   border-radius: 10px;
   transition: all 0.3s;

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

export const Container = styled.div`
   max-width: 630px;
   margin: 0 auto;
   padding: 24px 10px;
   display: flex;
   flex-direction: column;
   gap: 15px;
   margin-top: 70px;

   .title {
      color: rgb(45, 45, 45);
      font-weight: 700;
      font-size: 28px;
      margin-bottom: 10px;
   }

   .container-input {
      label {
         color: rgb(45, 45, 45);
         font-weight: 700;
         display: inline-block;
         padding: 0px;
         font-size: 1rem;
         line-height: 1.5;
      }
      input {
         height: 47px;
         border: 1px solid rgb(118, 118, 118);
      }
   }
   .ant-select-selector,
   .ant-picker {
      border: 1px solid rgb(118, 118, 118) !important;
   }

   .ant-row {
      label {
         color: rgb(45, 45, 45);
         font-weight: 700;
         display: inline-block;
         padding: 0px;
         font-size: 1rem;
         line-height: 1.5;
      }
   }

   .btn-save {
      width: fit-content;
      margin: 0 auto;
      width: 200px;
      margin-top: 20px;
   }

   .dob {
      margin-top: 10px;
      label {
         margin-bottom: -8px;
         display: block;
      }
   }
`;
