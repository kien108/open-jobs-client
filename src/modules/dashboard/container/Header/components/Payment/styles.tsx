import styled from "styled-components";

export const Container = styled.div`
   .payment-container {
      background-color: #1f1f1f;
      color: #fff;
      padding: 20px;
      border-radius: 10px;
      width: 400px;
      margin: 0 auto;
      text-align: center;
   }

   .payment-header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      background-repeat: no-repeat;
      background-size: cover;
      height: 160px;
      margin: -24px -24px 0 -24px;
      border-radius: 14px 14px 0 0;

      font-size: 20px;

      h2 {
         color: white;
      }
   }

   .buy-button {
      background-color: #fff;
      color: #1f1f1f;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
   }

   .user {
      position: relative;
      background: white;
      border: 1px solid #dedede;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
      border-radius: 6px;
      width: 800px;
      margin: 0 auto;
      transform: translateY(-40px);
      padding: 20px 40px;
      font-size: 16px;

      .title {
         display: flex;
         align-items: center;
         font-weight: 500;
         gap: 6px;
         font-size: 16px;

         .number {
            color: #e26900;
         }
      }

      .value {
         padding: 12px 30px;
         background: #fae9db;
         border-radius: 6px;
         display: flex;
         flex-direction: column;
         border: 1px solid #e26900;
         box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
         display: flex;
         gap: 10px;
         margin-top: 10px;

         .item {
            display: flex;
            align-items: center;
            gap: 10px;
         }

         .id {
            color: #e26900;
         }
      }
   }

   .select {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border: 1px solid #dedede;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
      border-radius: 6px;
      padding: 20px 40px;
      font-size: 16px;

      .title {
         display: flex;
         align-items: center;
         font-weight: 500;
         gap: 6px;
         font-size: 16px;

         .number {
            color: #e26900;
         }
      }

      .items {
         display: flex;
         align-items: center;
         flex-wrap: wrap;
         gap: 15px;
         margin-top: 10px;
      }

      .item {
         position: relative;
         display: flex;
         align-items: center;
         justify-content: space-between;
         background: black;
         border-radius: 10px;
         width: calc(50% - 15px);
         padding: 15px 33px 15px 40px;
         color: white;
         cursor: pointer;
         .left {
            display: flex;
            align-items: center;
            gap: 10px;
            img {
               width: 50px;
               height: 50px;
            }

            .point {
               font-size: 30px;
            }
         }

         .right {
            padding: 4px 20px;
            border-radius: 4px;
            background: #fd444a;
            width: 70px;
            text-align: center;
         }

         .checked {
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s linear;
            position: absolute;
            right: 1px;
            color: #44b380;
            z-index: 99;
         }

         &.active {
            border: 2px solid #fd444a;

            .checked {
               opacity: 1;
               visibility: visible;
            }
         }
      }
   }

   .btn-pay {
      margin-top: 40px;
      width: 100%;
      background-color: #e26900;

      &:hover {
         background-color: #cb6307 !important;
      }
   }
`;
