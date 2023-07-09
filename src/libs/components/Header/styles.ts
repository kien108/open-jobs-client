import styled from "styled-components";

export const StyledHeader = styled.header`
   z-index: 10;
   font-family: "Noto Sans", sans-serif;
   border-bottom: 1px solid rgba(0, 0, 0, 0.4);
   font-size: 16px;
   position: fixed;
   left: 0;
   right: 0;
   background: linear-gradient(269.85deg, #54151c 0%, #121212 54.89%);
`;

export const HeaderWrapper = styled.div`
   display: flex;
   justify-content: space-between;
   height: inherit;
   width: 100%;
   font-weight: 600;
   position: relative;
   padding: 10px 20px;
   width: 100%;
   max-width: 1600px;
   margin: 0 auto;
`;
