import styled from "styled-components";

export const Container = styled.div`
   padding: 16px 12px;
   background: white;
   box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
   border-radius: 8px;
   height: 325px;

   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: space-between;

   .date {
      color: #a6a6a6 !important;
      font-size: 14px;
      font-weight: 400;
   }

   .relative-title {
      font-size: 18px;
      font-weight: 700;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.2s linear;

      &:hover {
         cursor: pointer;
         color: ${(props) => props.theme.strongBlue};
      }
   }

   .relative-company {
      display: flex;
      align-items: center;
      gap: 10px;

      .img {
         width: 48px;
         aspect-ratio: 1;
         object-fit: cover;
         border: 1px solid #dedede;
         box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
         border-radius: 8px;
         overflow: hidden;
         cursor: pointer;

         img {
            width: 100%;
            height: 100%;
         }
      }

      .name {
         color: #414042;
         font-size: 14px;
         font-weight: 400;

         &:hover {
            cursor: pointer;
            color: ${(props) => props.theme.strongBlue};
         }
      }
   }

   .salary {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;
      font-size: 16px;
      color: #414042 !important;
      padding-bottom: 10px;
      border-bottom: 1px dashed #dedede;

      .value {
         color: ${(props) => props.theme.strongBlue};
         display: inline-block;
      }
   }

   .workplace {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .item {
         display: flex;
         align-items: center;
         gap: 10px;
         font-size: 14px;
         color: #414042 !important;
      }
   }

   .badge {
      position: absolute;
      top: 0px;
      right: 0px;
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
`;
