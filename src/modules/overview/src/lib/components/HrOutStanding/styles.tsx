import styled from "styled-components";

export const Container = styled.div`
   padding: 25px 0;
   max-width: 1250px;
   width: 100%;
   margin: 0 auto;
   margin-top: 30px;

   .title {
      color: white;
      font-size: 28px;
      font-weight: 700;
      display: block;
      margin-bottom: 20px;
   }

   .wrapper {
      width: 100%;
      max-width: 1250px;
      margin: 0 auto;
   }
   .container {
      .img {
         border-radius: 6px;
         border: 1px solid #efefef;

         background: white;

         padding: 25px;
         height: 100px;
         display: flex;
         align-items: center;
         justify-content: center;

         img {
            width: 100%;
            object-fit: cover;
            height: 100%;
         }
      }

      .name {
         text-align: center;
         margin-top: 10px;
         font-weight: 600;
         font-size: 16px;
         color: white;
      }
   }
`;
