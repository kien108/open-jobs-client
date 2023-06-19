import styled from "styled-components";

export const Header = styled.div`
   margin: 0 auto;
   max-width: 1250px;
   padding-top: 28px;
   padding-bottom: 10px;
`;

export const Content = styled.div`
   margin: 0 auto;
   max-width: 1100px;
`;

export const Container = styled.div`
   .title-container {
      margin-top: -15px;
      display: flex;
      align-items: center;
      justify-content: center;

      .title {
         color: #2557a7 !important;
         font-weight: 700;
         line-height: 26.27px;
         font-size: 17px;
         cursor: pointer;
      }

      .content {
         color: #4b4b4b;
         font-size: 17px;
         line-height: 1.67;
         margin-left: 3px;
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
