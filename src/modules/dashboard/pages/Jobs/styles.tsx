import { Modal } from "../../../../libs/components";

import styled, { StyledComponent } from "styled-components";

export const StyledFunctions: StyledComponent<any, any> = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
`;

export const BtnFunction: StyledComponent<any, any> = styled.div`
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

export const StyledModalDelete = styled(Modal)`
   .modal-confirm__title {
      margin-bottom: 20px;
      font-weight: 700;
   }

   .ant-btn {
      padding: 0 24px;
   }
`;

export const StyledModal = styled(Modal)`
   &.ant-modal {
      width: 900px !important;
      max-width: unset !important;

      .ant-typography {
         font-size: 28px;
         font-weight: 700;
      }

      .ant-modal-content {
         padding: 32px;
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
`;
