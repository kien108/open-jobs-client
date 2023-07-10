import styled from "styled-components";

export const Container = styled.div`
   .top {
      padding-bottom: 48px;
   }

   .bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 0;
      font-size: 12px;
      position: relative;

      &::after {
         content: "";
         width: 100%;
         display: block;
         position: absolute;
         border-bottom: 1px solid #ccc;
         height: 1px;
         top: 0;
      }
   }

   a {
      color: #a6a6a6;
   }
   color: #a6a6a6;
   font-size: 14px;
   .img {
      cursor: pointer;
      width: 130px;
      margin-bottom: 20px;
      img {
         width: 100%;
         height: 100%;
      }
   }
   .flex {
      display: flex;
      align-items: center;
      padding: 0 20px;

      &.icons {
         justify-content: center;
         gap: 10px;
      }

      &.col {
         flex-direction: column;
         align-items: flex-start;
         gap: 10px;
      }

      span {
         cursor: pointer;
         transition: all 0.2s linear;
         &:hover {
            color: white;
         }
      }

      .title {
         color: white;
         font-weight: 600;
         font-size: 16px;
         cursor: default;
      }

      .item {
         display: flex;
         align-items: center;
         gap: 10px;
      }
   }
`;
