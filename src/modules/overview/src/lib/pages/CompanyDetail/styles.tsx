import styled from "styled-components";

export const Container = styled.div`
   max-width: 1050px;
   margin: 0 auto;
   background-color: #fff;
   margin-top: 70px;

   .company-header {
      padding: 20px;
      border-radius: 4px;
      background-color: #fff;

      box-shadow: 0 0 1px #ccc;

      .header {
         display: flex;
         flex-direction: row;
         align-items: center;
         gap: 20px;
         margin-bottom: 10px;

         .right {
            display: flex;
            flex-direction: column;
            width: 100%;

            .name {
               font-size: 36px;
               font-weight: 600;
            }

            .content {
               width: 100%;
            }
         }

         .logo {
            width: 160px;
            height: 160px;
            object-fit: cover;
            border: 1px solid #ccc;
            border-radius: 10px;
            overflow: hidden;
            flex-shrink: 0;

            img {
               display: block;
               width: 100%;
               height: 100%;
            }
         }
      }

      .item {
         margin-top: 10px;
         display: flex;
         align-items: center;
         gap: 10px;
         color: ${(props) => props.theme.textDefault};
         font-weight: 400;
      }
   }
`;
