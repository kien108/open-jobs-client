import { Tabs } from "antd";
import styled from "styled-components";

export const StyledLogo = styled.header`
   /* padding: 20px 0; */
   z-index: 100;
   width: 130px;
   transform: translateY(20px);
   margin-right: 30px;
`;

export const StyledImage = styled.img`
   margin: 0 auto;
   width: 100%;
   height: 100%;
   object-fit: cover;
   display: block;
`;

export const StyledLeftHeader = styled.div`
   position: relative;
   z-index: 0;
   height: 56px;
   color: rgba(27, 31, 59, 0.65);
   font-family: "Noto Sans", sans-serif;
   margin-left: 12px;

   display: flex;
   align-items: center;

   .ant-tabs-content {
      display: none;
   }
`;

export const StyledContainerLink = styled(Tabs)`
   height: 100%;

   .ant-tabs-nav {
      margin: 0 !important;
      height: 100%;

      &::before {
         display: none;
      }
   }

   .ant-tabs-tab {
      padding: 0;
      &:hover {
         .custom-link-header {
            /* color: ${(props) => props.theme.textDefault}; */
            color: ${(props) => props.theme.strongBlue};
         }
      }
   }

   .ant-tabs-content-holder {
      display: none;
   }

   .custom-link-header {
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      /* color: rgb(45, 45, 45); */
      color: #a6a6a6;
      font-family: "Noto Sans", sans-serif;
      text-shadow: none;
   }
   .ant-tabs-tab-active {
      .custom-link-header {
         /* color: ${(props) => props.theme.strongBlue}; */
         color: #1864e6;
         &:hover {
            color: ${(props) => props.theme.strongBlue};
         }
      }
   }
   .ant-tabs-ink-bar {
      background: ${(props) => props.theme.strongBlue};
   }

   .ant-tabs-nav-operations {
      display: none !important;
   }
`;

export const StyledLink = styled(Tabs.TabPane)`
   height: 56px;
`;
