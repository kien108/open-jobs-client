import styled from 'styled-components';

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h2 {
    margin: 0;
  }

  .right {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }
`;
