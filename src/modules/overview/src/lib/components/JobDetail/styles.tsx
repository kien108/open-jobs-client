import styled from "styled-components";

export const Container = styled.div`
   padding: 20px;
   border-radius: 8px;
   box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
   border: 1px solid #d4d2d0;
   background-color: #fff;

   .header {
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: sticky;
      top: 78px;
      z-index: 99;
      background-color: white;

      &.hide {
         position: unset;
      }

      .content {
         display: flex;
         flex-direction: column;
         color: rgb(45, 45, 45);
         line-height: 24px;

         .job-title {
            font-size: 18px;
            font-weight: 700;
            transition: all 0.2s linear;
            cursor: pointer;

            &:hover {
               color: ${(props) => props.theme.strongBlue};
            }
         }

         .company,
         .location {
            font-size: 17px;
         }

         .notify {
            font-size: 13px;
         }
      }

      .apply {
         display: flex;
         align-items: center;
         gap: 20px;

         .btn-apply {
            background-color: #2557a7;
            border: 0.0625rem solid transparent;
            -webkit-transition: background-color 0.18s ease-out, border-color 0.18s ease-out;
            transition: background-color 0.18s ease-out, border-color 0.18s ease-out;
            font-size: 16px;
            line-height: 24px;
            width: 100%;
            height: 46px;
            font-weight: 500;

            &.applied {
               background-color: #ccc;
               color: #585656;
               font-weight: 500;
            }
         }

         .save-job {
            cursor: pointer;
         }
      }
   }

   .content {
      .skills {
         display: flex;
         align-items: center;
         gap: 15px;

         .skill {
            color: #414042;
            background-color: #fff;
            border: 1px solid #dedede;
            padding: 4px 10px;
            font-size: 12px;
            border-radius: 20px;
            display: block;
            border: 1px solid ${(props) => props.theme.strongBlue};

            &.invalid {
               background-color: #ccc;
               border-color: transparent;
            }
         }
      }

      .job-information {
         margin-top: 15px;

         display: flex;
         flex-direction: column;
         gap: 10px;
         font-size: 14px;

         .item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #373737;

            &:first-child {
               color: #2557a7;
               font-weight: 500;
            }
         }
      }
   }

   .footer {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 0 0 1px #ccc;

      .header {
         display: flex;
         flex-direction: row;
         align-items: center;
         gap: 20px;
         margin-bottom: 10px;
         background-color: #f5f5f5 !important;

         .right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .name {
               font-size: 24px;
               font-weight: 500;
            }

            .slogan {
               font-size: 14px;
               color: rgb(92, 90, 91);
               font-weight: 500;
            }
         }

         .logo {
            width: 65px;
            height: 65px;
            object-fit: cover;
            border: 1px solid #ccc;
            border-radius: 10px;
            overflow: hidden;

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
