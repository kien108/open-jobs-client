import styled from "styled-components";

export const Container = styled.div`
   max-width: 1250px;
   width: 100%;
   margin: 0 auto;

   height: 360px;
   padding: 30px 0;

   .left,
   .right {
      box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      border: 1px solid #dee2e6;
   }

   .title {
      display: flex;
      align-items: center;
      font-size: 28px;
      font-weight: 700;
      gap: 5px;
      margin-bottom: 15px;

      .main {
         color: ${(props) => props.theme.strongBlue};
      }
   }
`;
