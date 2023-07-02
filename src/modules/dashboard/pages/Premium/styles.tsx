import styled from "styled-components";

export const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top: 40px;
   display: flex;
   align-items: flex-start;
   gap: 20px;

   .premium {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;

      .price {
         font-size: 34px;
         font-weight: 600;
         color: ${(props) => props.theme.strongBlue};
      }
   }

   .card {
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
      padding: 30px;
      text-align: center;
      width: 430px;
      cursor: pointer;
      border: 2px solid transparent;

      &.active {
         border-color: ${(props) => props.theme.strongBlue};
      }
      position: relative;
   }

   .card h2 {
      color: #333;
      font-size: 26px;
      font-weight: 500;
      text-align: left;
      margin-bottom: 0px;
   }

   .card p {
      color: #666;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 30px;
   }

   .features {
      display: flex;
      align-items: flex-start;
      flex-direction: column;

      margin-bottom: 30px;
      padding: 0 15px;
      margin-top: 30px;
   }

   .feature {
      display: flex;
      align-items: center;
      gap: 15px;
   }

   .feature i {
      color: #4caf50;
      font-size: 20px;
      margin-right: 10px;
   }

   .feature span {
      color: #333;
      font-size: 16px;
   }

   .upgrade-button {
      width: fit-content;
      margin: 0 auto;
      border-radius: 15px;
   }

   .upgrade-button:hover {
      opacity: 0.9;
      background-color: ${(props) => props.theme.strongBlue};
   }

   .badge {
      position: absolute;
      top: 0;
      right: 0;
      margin-left: auto;

      display: flex;
      align-items: flex-end;
      text-align: center;
      width: fit-content;
      padding: 6px 12px;
      border-radius: 4px 4px 0 4px;
      font-size: 14px;
      color: #fff;
      font-weight: 600;
      background-color: green;

      &.hidden {
         display: none;
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
`;
