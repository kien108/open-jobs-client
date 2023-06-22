import styled from "styled-components";

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: 285px;

   .content {
      /* border: 1px solid #ccc; */
      padding: 12px;
      height: 33.33%;

      &.border {
         border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      }

      .sug-company {
         color: #999;
         font-size: 12px;
         font-weight: 600;
      }

      .title {
         font-size: 17px;
         margin-bottom: 0px;

         &:hover {
            color: #2557a7;
            cursor: pointer;
         }
      }

      .salary {
         color: #2557a7;
         font-size: 12px;
         font-weight: 500;
      }
   }

   border-radius: 2px;
   border: 1px solid rgba(0, 0, 0, 0.15);
   overflow: hidden;
`;
