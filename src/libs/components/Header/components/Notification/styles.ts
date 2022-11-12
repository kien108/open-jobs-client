import styled from 'styled-components';

export const StyledNotification = styled.div`
  width: 500px;
  background-color: ${(props) => props.theme.gray};

  button {
    align-items: center;
    justify-content: center;
    display: flex;
    min-height: 44px;
    width: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
    transition: background 300ms ease-in-out;

    path {
      fill: ${(props) => props.theme.strongGray};
    }
  }

  section {
    padding: 20px;
  }
`;
