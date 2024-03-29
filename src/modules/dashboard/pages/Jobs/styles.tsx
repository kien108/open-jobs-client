import { Modal } from "../../../../libs/components";

import styled, { StyledComponent } from "styled-components";

export const StyledFunctions: StyledComponent<any, any> = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
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

   .icon-renewal {
      path:first-child {
         fill: transparent;
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
      width: 1000px !important;
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

   .name {
      font-weight: 600;
      color: ${(props) => props.theme.strongBlue};
      text-transform: uppercase;
   }

   .salary {
      color: ${(props) => props.theme.strongBlue};
      font-weight: 700;
   }

   .badge-status {
      border-radius: 8px;
      text-align: center;
      padding: 4px 4px;
      font-size: 13px;
      color: white;

      &.NEW {
         background-color: yellow;
         color: black;
      }

      &.APPROVED {
         background: ${(props) => props.theme.strongBlue};
      }

      &.REJECTED {
         background: red;
      }

      &.HIDDEN {
         background: #ccc;
         color: black;
      }
   }
`;

export const StyledDetail = styled(Modal)`
   .job-detail-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
   }

   .ant-modal-content {
      padding: 32px !important;
   }
`;
