import styled from "styled-components";

export const Container = styled.div`
   max-width: 600px;
   margin: 0 auto;
   padding: 24px 10px;
   display: flex;
   flex-direction: column;
   gap: 10px;

   .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .name {
         font-size: 2.25rem;
         line-height: 1.25;
         color: rgb(45, 45, 45);
         font-weight: 700;
      }

      .sb-avatar {
         span {
            font-weight: 700;
         }
      }
   }

   .profile {
      padding: 16px;
      box-sizing: border-box;
      margin: 0.75rem 0px;
      min-width: 0px;
      background-color: rgb(243, 242, 241);
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      display: flex;
      align-items: center;
      justify-content: space-between;

      &:hover {
         box-shadow: rgb(45 45 45 / 12%) 0px 0.125rem 0.25rem,
            rgb(45 45 45 / 16%) 0px 0.0625rem 0.1875rem, rgb(45 45 45 / 20%) 0px 0px 0.125rem;
      }

      .items {
         display: flex;
         flex-direction: column;
         gap: 10px;

         .item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: rgb(109, 109, 109);
            font-size: 16px;
         }
      }
   }

   .resume {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      box-sizing: border-box;
      margin: 0.75rem 0px;
      min-width: 0px;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      border: 1px solid rgb(212, 210, 208);

      .left {
         display: flex;
         align-items: center;
         gap: 15px;

         .img {
            width: 44px;
            height: auto;
            object-fit: contain;
         }

         .content {
            display: flex;
            flex-direction: column;
            .title {
               color: rgb(45, 45, 45);
               font-weight: 600;
               font-size: 16px;
            }
            span {
               font-size: 0.875rem;
               line-height: 1.5;
               color: rgb(118, 118, 118);
            }
            .item {
               display: flex;
               align-items: center;
               gap: 10px;
               color: rgb(109, 109, 109);
               font-size: 16px;
            }
         }
      }

      &:hover {
         box-shadow: rgb(45 45 45 / 12%) 0px 0.125rem 0.25rem,
            rgb(45 45 45 / 16%) 0px 0.0625rem 0.1875rem, rgb(45 45 45 / 20%) 0px 0px 0.125rem;
      }
   }
`;
