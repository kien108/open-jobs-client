import styled from "styled-components";

export const Container = styled.div`
   padding: 20px;
   border-radius: 8px;
   box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
   border: 1px solid #ccc;
   background-color: #fff;

   .badge {
      position: relative;
      top: -16px;
      right: -20px;
      margin-left: auto;

      display: flex;
      align-items: flex-end;
      text-align: center;
      width: fit-content;
      padding: 4px 12px;
      border-radius: 4px 4px 0 4px;
      font-size: 14px;
      color: #fff;
      font-weight: 600;
      background-color: green;

      &.applied {
         background-color: green;
      }

      &.hidden {
         display: none;
      }

      &.new {
         background-color: #ff9119;

         &::after {
            border-top: 8px solid #ff9119;
         }
      }

      &::after {
         border-top: 8px solid green;
         content: "";
         position: absolute;
         top: 100%;
         right: 0%;
         width: 0;
         height: 0;
         border-left: 8px solid transparent;
      }
   }

   cursor: pointer;

   &.active {
      border: 2px solid #2557a7;
   }
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

         .salary {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 500;
            font-size: 15px;
            color: #414042 !important;
            padding-bottom: 10px;
            border-bottom: 1px dashed #dedede;

            svg {
               path {
                  color: ${(props) => props.theme.strongBlue};
               }
            }

            .value {
               color: ${(props) => props.theme.strongBlue};
               display: inline-block;
            }
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
      display: flex;
      align-items: center;
      gap: 8px;

      .skill {
         color: #414042;
         background-color: #fff;
         border: 1px solid #dedede;
         padding: 4px 10px;
         font-size: 12px;
         border-radius: 20px;
         display: block;
         border: 1px solid ${(props) => props.theme.strongBlue};
         margin: 10px 0;

         &.invalid {
            background-color: #ccc;
            border-color: transparent;
         }
      }
   }

   .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
