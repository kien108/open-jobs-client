import styled from 'styled-components';

export const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.secondaryText};
  z-index: 10;
  height: 56px;
  font-family: 'Inter', -apple-system, 'BlinkMacSystemFont', system-ui, 'Roboto', 'Segoe UI',
    'Helvetica Neue', sans-serif;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: inherit;
  width: 100%;
  font-weight: 600;
  position: relative;
`;
