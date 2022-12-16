import { Modal } from "../../../../../../libs/components";

import styled, { StyledComponent } from "styled-components";

export const ContainerTable = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;

   margin-top: 24px;
   padding: 24px;
   box-shadow: 0 0 #000, 0 0 #000, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 0 10px -6px rgb(0 0 0 / 0.1);
   background: ${(props) => props.theme.secondaryText};
   border-radius: 10px;

   font-weight: 500;
   font-size: 14px;

   .position {
      font-weight: 600;
      color: ${(props) => props.theme.strongBlue};
      text-transform: uppercase;
   }

   .title {
      cursor: pointer;

      &:hover {
         text-decoration: underline;
      }
   }
`;

export const Container = styled.div`
   max-width: 1200px;
   margin: 30px auto;
`;
