import styled from "styled-components";

export const Container = styled.div`
   margin: 0 auto;
   max-width: 100vw;
   background-color: white;
   padding: 80px 18vw 40px;

   .header {
      .title {
         margin-bottom: 1rem;
         font-size: 2.75rem;
         line-height: 1.25;
         letter-spacing: -0.0625rem;
         color: #2d2d2d;
         font-weight: 700;
         display: block;
      }

      .sub-title {
         display: block;
         font-size: 1.25rem;
         line-height: 1.5;
         margin-bottom: 1.5rem;
         color: #595959;
         font-weight: 400;
      }
   }

   .companies-content {
      .search-result {
         color: #2d2d2d;
         font-weight: 700;
         font-size: 1rem;
         line-height: 1.5;
         margin-top: 50px;
         display: block;
      }
      .notFound {
         display: block;
         color: #2d2d2d;
         font-weight: 700;
         font-size: 1rem;
         line-height: 1.5;
         margin-top: 20px;
      }
   }
   .companies {
      box-shadow: 0 0 3px #595858;
      padding: 10px;
      border-radius: 8px;
      margin-top: 20px;

      .company {
         display: flex;
         flex-direction: row;
         align-items: center;
         gap: 20px;
         margin-bottom: 10px;
         cursor: pointer;
         position: relative;

         &::before {
            content: "";
            position: absolute;
            inset: 0;
            display: none;
            background-color: rgba(0, 0, 0, 0.05);
            transition: all 0.2s linear;
         }

         &:hover {
            &::before {
               display: block;
            }
         }

         .right {
            display: flex;
            flex-direction: column;
            width: 100%;

            .name {
               font-size: 18px;
               color: ${(props) => props.theme.strongBlue};
               font-weight: 600;
            }

            .content {
               width: 100%;
            }
         }

         .logo {
            width: 120px;
            height: 120px;
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
   }

   .item {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: ${(props) => props.theme.textDefault};
      font-size: 13px;
      font-weight: 400;
   }
`;
