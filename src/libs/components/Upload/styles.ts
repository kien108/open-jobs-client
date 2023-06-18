import styled from "styled-components";
import { Upload } from "antd";

const { Dragger } = Upload;

interface Props {
   typeUpload?: string;
   error?: boolean;
   count?: any;
}

export const Container = styled.div<Props>`
   margin-bottom: 10px;

   .label-container {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 4px;
      color: #1b1f3b;
      display: flex;
      align-items: center;
      gap: 2px;

      .label {
      }

      .required {
         color: red;
      }
   }

   .error {
      margin-top: 8px;
      text-align: center;
      color: red;
   }

   a {
      pointer-events: none;
      color: ${(props) => props.theme.textDefault};
   }

   .upload-list-inline-single {
      position: static;
      width: 100%;
   }

   .group-image {
      position: relative;

      .ant-upload-span {
         /* position: relative; */
         height: 56px !important;
      }
   }

   .ant-upload-list {
      margin-top: 20px;
      display: ${(props) => (props?.count > 0 ? "grid" : "none")};
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      min-height: ${(props) => (props.typeUpload === "multiple" ? "56px" : " 100%")};

      /* display: flex;
      align-items: center;
      flex-wrap: wrap; */

      &::after,
      &::before {
         content: none;
      }

      &.ant-upload-list-picture {
         display: block;

         .ant-upload-list-item {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;

            &:hover {
               .ant-upload-span {
                  .ant-upload-list-item-name {
                     pointer-events: none;
                  }
               }
            }

            .ant-upload-span {
               border: none;

               .ant-upload-list-item-name {
                  display: none;
               }
            }
         }
      }

      .ant-upload-list-text-container {
         width: 100%;
      }

      .ant-upload-list-item {
         position: static;
         height: 100%;
         margin: 0;
         width: 100%;

         .ant-upload-list-item-info {
            border: 1px solid ${(props) => (props.error ? props.theme.red : "transparent")};
            border-radius: 8px;

            .ant-upload-list-item-card-actions {
               opacity: 0;
               transition: all 0.3s ease-in-out;

               svg {
                  width: 12px;
                  height: 12px;
               }
            }

            &:hover {
               background-color: transparent;
               border-radius: 8px;
               border: 1px solid
                  ${(props) => (props.error ? props.theme.red : props.theme.baseGray)};
               border-color: ${(props) =>
                  props.typeUpload === "multiple" ? "transparent" : "props.theme.baseGray"};

               .ant-upload-list-item-card-actions {
                  opacity: 1;
               }
            }
         }
      }

      .ant-upload-span {
         border-radius: 8px;
         padding: 8px;
         border: 1px solid ${(props) => props.theme.baseGray};

         .ant-upload-list-item-thumbnail {
            width: auto;
            height: auto;
            margin-right: 24px;

            .ant-upload-list-item-image {
               width: 100%;
               height: 144px;
            }
         }

         .ant-upload-text-icon {
            .downloadBtn {
               cursor: pointer;
               position: absolute;
               right: 0;
               top: 0;
               height: 56px;
               display: flex;
               align-items: center;
               justify-content: center;
               border-radius: 8px;
               width: 56px;
               border: 1px solid ${(props) => props.theme.baseGray};
            }
         }

         .ant-btn {
            opacity: 1;
         }
      }
   }
`;
export const StyledDragger = styled(Dragger)`
   font-size: 15px;
   border-radius: 10px !important;
   width: 100%;
   height: 56px;
   overflow: hidden;
   border-color: ${(props) => props.theme.blue} !important;
   color: ${(props) => props.theme.textDefault} !important;
   background: ${(props) => props.theme.secondaryText} !important;
   padding: 0;
   transition: all 0.2s ease-in-out;

   &.upload-list-inline {
      height: 56px;
      /* position: absolute; */
      /* width: 24%; */
   }

   &:hover {
      background: rgb(7, 74, 179, 0.1) !important;
   }

   .ant-upload-text {
      color: ${(props) => props.theme.blue};
   }

   .ant-upload-select,
   .ant-upload-select-picture {
      width: 100%;
      margin-bottom: 10px;
   }

   .ant-upload-btn {
      padding: 0 !important;
   }

   &.ant-upload-disabled,
   .ant-upload-disabled {
      cursor: initial;
      border: 1px solid ${(props) => props.theme.borderInput} !important;
      color: ${(props) => props.theme.black} !important;

      &:hover {
         background-color: transparent !important;
      }
   }

   .info-subtext {
      display: flex;
      height: 56px;
      justify-content: center;
      align-items: center;

      .text {
         color: rgb(88, 109, 204);
      }

      .sub-text {
         margin-left: 5px;
         color: rgb(108, 110, 127);
      }
   }

   .text-input {
      color: ${(props) => props.theme.textDefault} !important;
   }

   .name-input:hover {
      .delete-input {
         display: block;
         color: black !important;
         background: transparent;
         font-weight: 700;
         cursor: pointer;
      }
   }

   .info-input {
      display: flex;

      .check-input {
         margin-right: 10px;

         svg {
            font-size: 22px;
            color: green !important;
         }
      }
   }
`;
