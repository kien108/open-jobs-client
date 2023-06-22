import styled from "styled-components";

export const Container = styled.div`
   padding: 25px 0;
   max-width: 1250px;
   margin: 0 auto;
   margin-top: 30px;

   .title {
      color: #222;
      font-size: 28px;
      font-weight: 700;
      display: block;
      margin-bottom: 20px;
      margin-top: 40px;
   }
`;

export const StyledJobItem = styled.div`
   /* padding: 12px;
   box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
   border-radius: 8px;
   border: 1px solid #dee2e6;
   display: flex;
   align-items: center;
   gap: 15px;
   transition: 0.2s linear all;
   cursor: pointer;

   &:hover {
      background-color: rgba(7, 74, 189, 0.2);
   }

   .img {
      width: 120px;
      flex-grow: 1;
      height: 100%;

      img {
         object-fit: cover;
         width: 100%;
         height: 100%;
      }
   }

   .content {
      display: flex;
      flex-direction: column;
      width: 100%;

      .job-title {
         font-weight: 600;
         font-size: 15px;
         display: block;
         width: 92%;
         overflow: hidden;
         max-height: 36px;
         text-overflow: ellipsis;
         transition: color 0.3s;
      }

      .address {
         margin-top: 10px;
         margin-bottom: 4px;
         color: #393e46;
         overflow: hidden;
         text-overflow: ellipsis;
         max-height: 21px;
         font-size: 14px;
      }

      .salary {
         width: 100%;
         display: flex;
         align-items: center;
         justify-content: space-between;

         .value {
            color: ${(props) => props.theme.strongBlue};
            display: inline-block;
         }

         .post-at {
            color: #d34127;
            display: inline-block;
            margin-right: 4px;
         }
      }
   } */
`;
