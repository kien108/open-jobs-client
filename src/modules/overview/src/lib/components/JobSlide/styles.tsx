import styled from "styled-components";

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: 285px;

   .content {
      border: 1px solid #ccc;
      padding: 14px;
      height: 33.33%;

      .company {
         color: #999;
         font-size: 12px;
         font-weight: 500;
      }

      .title {
         font-size: 17px;
         margin-bottom: 0px;
      }

      .salary {
         color: #2557a7;
         font-size: 11px;
         font-style: italic;
      }
   }

   border-radius: 10px;
   border: 1px solid #ccc;
   overflow: hidden;
`;
