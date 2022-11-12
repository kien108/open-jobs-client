import styled, { StyledComponent } from "styled-components";

export const StyledOption: StyledComponent<any, any> = styled.span`
   display: block;
   font-size: 15px;
   color: ${(props) => props.theme.textDefault};
`;

export const Container: StyledComponent<any, any> = styled.div`
   margin-bottom: 20px;

   label.sub-label {
      color: #2d2d2d;
      font-size: 0.875rem;
      letter-spacing: 0;
      font-weight: 700;
      line-height: 1.125rem;
   }

   .search {
      border: 1px solid #a3a3a3;
      border-radius: 0.5rem;
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
      font-weight: 700;
      line-height: 1.125rem;
   }

   .btn-find {
      cursor: pointer;
      background: none;
      font-family: Noto Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 0.875rem;
      letter-spacing: 0;
      font-weight: 700;
      line-height: 1.43;
      margin: 0 0 1rem;
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
      min-width: 94px;
   }
`;
