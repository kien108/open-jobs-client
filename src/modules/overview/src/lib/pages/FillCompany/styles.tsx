import styled from "styled-components";

export const Container = styled.div`
   margin: 0 auto;
   padding: 24px;
   box-shadow: 0 0 #000, 0 0 #000, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 0 10px -6px rgb(0 0 0 / 0.1);
   background: ${(props) => props.theme.secondaryText};
   border-radius: 10px;

   .header {
      margin-bottom: 30px;

      span:first-child {
         display: block;
         margin: 0px 0px 1rem;
         color: rgb(45, 45, 45);
         font-weight: 700;
         font-family: "Noto Sans", "Helvetica Neue", Helvetica, Arial, "Liberation Sans", Roboto,
            Noto, sans-serif;
         font-size: 1.75rem;
         line-height: 1.25;
      }

      span {
         font-family: "Noto Sans", "Helvetica Neue", Helvetica, Arial, "Liberation Sans", Roboto,
            Noto, sans-serif;
         font-weight: inherit;
         color: rgb(118, 118, 118);
         font-size: 1rem;
         line-height: 1.5;
      }
   }

   .right {
      width: 100%;
      height: auto;
      object-fit: contain;

      img {
         display: block;
         width: 100%;
         height: 100%;
      }
   }

   .container-input {
      input {
         height: 48px;
      }
   }

   .ant-select-selector {
      height: 52px !important;
      min-height: unset !important;
   }

   label {
      font-family: "Noto Sans", "Helvetica Neue", Helvetica, Arial, "Liberation Sans", Roboto, Noto,
         sans-serif;
      opacity: 1;
      transition: opacity 200ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s,
         color 200ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
      color: rgb(45, 45, 45);
      font-weight: 700;
      display: inline-block;
      padding: 0px;
      margin-bottom: 0.25rem;
      font-size: 14px;
      line-height: 1.5;
   }

   .btn-save {
      margin: 20px auto;
   }
`;
