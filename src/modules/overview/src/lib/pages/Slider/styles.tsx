import styled from "styled-components";

export const Container = styled.div`
   height: 360px;
   padding: 30px 0;

   .title {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 700;
      gap: 5px;
      margin-bottom: 15px;

      .main {
         color: ${(props) => props.theme.strongBlue};
      }
   }
`;
