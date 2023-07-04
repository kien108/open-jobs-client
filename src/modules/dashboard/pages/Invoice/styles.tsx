import styled from "styled-components";

export const Content = styled.div`
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

   .service {
      font-weight: 500;
      &.income {
         color: green;
      }

      &.outcome {
         color: red;
      }
   }
`;
