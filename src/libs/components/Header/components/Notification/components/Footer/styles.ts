import styled from 'styled-components';

export const FooterStyled = styled.footer`
  gap: 16px;
  display: flex;
  margin-top: 8px;
  align-items: center;
  justify-content: center;

  button {
    height: 44px;
    font-size: 15px;
    justify-content: center;
    padding: 0;
    border-radius: 10px;

    &:hover {
      background-color: #dfe3f3;
    }

    span {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #526ed3;
      font-weight: 700;
    }
  }
`;
