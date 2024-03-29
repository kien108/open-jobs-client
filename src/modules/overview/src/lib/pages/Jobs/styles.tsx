import styled from "styled-components";

export const Header = styled.div`
   padding-top: 28px;
   padding-bottom: 10px;
   background: linear-gradient(269.85deg, #54151c 0%, #121212 54.89%);
`;

export const Content = styled.div`
   margin: 0 auto;
   max-width: 1100px;
`;

export const Container = styled.div`
   .left {
      position: sticky;
      top: 75px;
   }

   .title-container {
      margin-top: -15px;
      display: flex;
      align-items: center;
      justify-content: center;

      .title {
         color: #3270d4 !important;
         font-weight: 500;
         line-height: 26.27px;
         font-size: 17px;
         cursor: pointer;
      }

      .content {
         color: white;
         font-size: 17px;
         line-height: 1.67;
         margin-left: 3px;
         font-weight: 200;
      }
   }

   .ant-divider {
      border-top: 1px solid rgba(0, 0, 0, 0.2);
   }

   .no-results {
      display: block;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
   }

   .job-detail {
      position: -webkit-sticky;
      position: sticky;
      top: 3px;
   }
`;
