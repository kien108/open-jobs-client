import styled, { StyledComponent } from "styled-components";

export const StyledOption: StyledComponent<any, any> = styled.span`
   display: block;
   font-size: 15px;
   color: ${(props) => props.theme.textDefault};
`;

export const Container: StyledComponent<any, any> = styled.div`
   margin: 0 auto;
   margin-bottom: 20px;
   max-width: 1250px;
   border: 1px solid ${(props) => props.theme.strongBlue};
   border-radius: 8px;
   padding: 12px;

   .header {
      /* border: 2px solid ${(props) => props.theme.strongBlue}; */
      /* border-top-width: 2px; */
      padding: 10px 8px;
      border-radius: 8px 8px 0 0;
   }

   .filter {
      /* border: 2px solid ${(props) => props.theme.strongBlue}; */
      padding: 10px 8px;

      border-radius: 0 0 8px 8px;
   }

   label.sub-label {
      color: #2d2d2d;
      font-size: 0.875rem;
      letter-spacing: 0;
      font-weight: 500;
      line-height: 1.125rem;
   }

   .search {
      border: 1px solid #a3a3a3;
      border-radius: 0.5rem;
      height: 46px;

      & + label {
         font-weight: 500;
         color: black;
      }
   }

   .ant-select-selector {
      height: 48px !important;
      min-height: unset !important;
      border: 1px solid #a3a3a3 !important;

      .ant-select-selection-item {
         margin-top: 8px !important;
      }

      .ant-select-selection-search-input {
         height: 100% !important;
      }
   }

   article {
      color: #2d2d2d;
      font-size: 0.875rem;
      letter-spacing: 0;
      font-weight: 500;
      line-height: 1.125rem;
   }

   .btn-find {
      cursor: pointer;
      background: none;
      font-family: Noto Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 0.875rem;
      letter-spacing: 0;
      font-weight: 500;
      line-height: 1.43;
      line-height: 1.125rem;
      padding: 0.75rem 1rem;
      display: block;
      box-sizing: border-box;
      white-space: nowrap;
      word-break: keep-all;
      flex-shrink: 0;
      background-color: #2557a7;
      border: 0.0625rem solid transparent;
      border-radius: 0.5rem;
      color: #fff;
      box-shadow: none;
      text-align: center;
      text-decoration: none;
      width: 100%;
   }

   .btn-filter {
      border: 1px solid #a3a3a3;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 46px;
      font-weight: 500;
      color: white;

      cursor: pointer;
      gap: 2px;
   }
`;

export const ContainerFilterJob = styled.div`
   margin-bottom: 20px;
   border-radius: 8px;
   padding: 12px;

   label {
      font-weight: 500 !important;
      font-size: 14px;
      color: #2d2d2d;
   }

   label.sub-label {
      color: #2d2d2d;
      font-size: 0.875rem;
      letter-spacing: 0;
      font-weight: 500;
      line-height: 1.125rem;
   }

   .search {
      border: 1px solid #a3a3a3;
      border-radius: 0.5rem;
      height: 46px;

      & + label {
         font-weight: 500;
         color: black;
      }
   }

   .ant-select-selector {
      height: 48px !important;
      min-height: unset !important;
      border: 1px solid #a3a3a3 !important;

      .ant-select-selection-item {
         margin-top: 8px !important;
      }

      .ant-select-selection-search-input {
         height: 100% !important;
      }
   }

   .ant-picker.ant-picker-range {
      height: 48px;
   }
   article {
      color: #2d2d2d;
      font-size: 0.875rem;
      letter-spacing: 0;
      font-weight: 500;
      line-height: 1.125rem;
   }
`;
