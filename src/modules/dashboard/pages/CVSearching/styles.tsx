import styled from "styled-components";

export const Container = styled.div`
   h1.title {
      font-size: 30px;
      font-weight: 500;
   }
`;

export const Content = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;

   margin-top: 24px;
   padding: 24px;
   box-shadow: 0 0 #000, 0 0 #000, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 0 10px -6px rgb(0 0 0 / 0.1);
   background: ${(props) => props.theme.secondaryText};
   border-radius: 10px;

   .title {
      color: ${(props) => props.theme.strongBlue};
      font-weight: 500;
   }

   .active {
      width: 60px;
      border-radius: 8px;
      padding: 3px 0;
      text-align: center;
      display: block;

      &.true {
         background: green;
      }

      &.false {
         background: #ccc;
      }
   }
`;

export const BtnFunction = styled.div`
   cursor: pointer;
   width: 44px;
   height: 44px;
   display: flex;
   align-items: center;
   justify-content: center;

   border-radius: 10px;
   transition: all 0.3s;

   svg {
      path {
         fill: ${(props) => props.theme.blue};
         transition: all 0.3s;
      }
   }

   .icon-password {
      path:first-child {
         fill: #fff;
      }
   }

   &:hover {
      background: ${(props) => props.theme.softBlue};
      svg {
         path {
            fill: ${(props) => props.theme.blueHover};
         }
      }
   }
`;

export const StyledFunctions = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
`;
