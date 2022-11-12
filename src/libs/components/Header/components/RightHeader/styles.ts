import styled from "styled-components";

export const StyledRightHeader = styled.div`
   position: absolute;
   right: 0;
   top: 0;
   bottom: 0;
   padding-left: 16px;
   padding-right: 16px;
   border-width: 0;
   border-left-width: 1px;
   gap: 8px;
   display: flex;
   align-items: center;
   border-style: solid;
   border-color: #e5e7eb;
   background-color: #fff;

   .notification {
      position: relative;

      .number-notification {
         position: absolute;
         top: -4px;
         right: -4px;
         background-color: red;
         padding: 0 6px;
         height: 20px;
         min-width: 20px;
         border-radius: 50%;
         display: flex;
         align-items: center;
         justify-content: center;
         color: #fff;
         font-size: 11px;
      }
   }

   .sign-in {
      font-size: 14px;
      font-weight: 700;
      color: ${(props) => props.theme.strongBlue};
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
         opacity: 0.8;
      }
   }
`;
