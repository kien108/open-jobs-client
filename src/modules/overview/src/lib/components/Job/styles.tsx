import styled from "styled-components";

export const Container = styled.div`
   padding: 20px;
   border-radius: 8px;
   box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
   border: 1px solid #2557a7;
   cursor: pointer;
   .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .btn-more {
         align-self: flex-start;
      }

      .left {
         display: flex;
         flex-direction: column;
         color: rgb(45, 45, 45);
         line-height: 24px;

         .job-title {
            font-size: 18px;
            font-weight: 700;
         }

         .company,
         .location {
            font-size: 17px;
         }
      }
   }

   .body {
      margin-top: 20px;
      margin-bottom: 10px;
      list-style-type: circle;
      padding-left: 22px;
   }

   .skills {
      margin: 10px 0;
      .skill {
         border-radius: 4px;
         padding: 2px 8px;
         font-size: 13px;
         margin-right: 10px;
      }
   }

   .footer {
      display: flex;
      align-items: center;
      gap: 4px;
      color: rgb(111, 111, 111);
      font-size: 13px;

      .time {
         color: rgb(111, 111, 111);
         font-size: 13px;
      }

      .dot {
         background-color: rgb(111, 111, 111);
         border-radius: 100%;
         width: 4px;
         height: 4px;
      }

      .author {
         margin-left: 4px;
      }
   }
`;

export const BtnFunction = styled.div`
   cursor: pointer;
   width: 30px;
   height: 30px;
   display: flex;
   align-items: center;
   justify-content: center;

   border-radius: 10px;
   transition: all 0.3s;

   svg {
      path {
         fill: ${(props) => props.theme.black};
         transition: all 0.3s;
      }
   }

   &:hover {
      opacity: 0.8;
   }
`;
