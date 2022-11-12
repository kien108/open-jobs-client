import styled from "styled-components";

export const StyledSidebar = styled.div`
   height: 100vh;
   display: flex;
   flex-direction: column;
   border-right: 1px solid #ededed;
   .link-sidebar {
      color: ${(props) => props.theme.primaryText};

      &:hover {
         color: ${(props) => props.theme.textDefault};
      }
   }

   .custom-sidebar {
      border-right: 1px solid ${(props) => props.theme.baseGray};
   }

   .custom-menu {
      overflow-x: hidden;
      height: inherit;
      padding: 8px 16px;

      &::-webkit-scrollbar {
         width: 4px;
      }

      &::-webkit-scrollbar-track {
         background: #fff;
         border-radius: 100px;
      }

      &::-webkit-scrollbar-thumb {
         background: ${(props) => props.theme.scrollbar};
         border-radius: 100px;
      }

      &.more-width {
         &::-webkit-scrollbar {
            width: 6px;
         }
      }

      .ant-menu-item {
         padding-left: 20px !important;
         padding: 20px;
         justify-content: flex-start;
         border: none;
         margin-top: 0;
         margin-bottom: 0 !important;
         font-size: 14px;
         font-weight: 600;
         line-height: 20px;
         border-radius: 10px;
         min-height: 44px;
         height: unset;
         gap: 20px;

         .ant-menu-title-content {
            margin-left: 0;
         }

         &::after {
            display: none;
         }

         &:hover {
            background-color: ${(props) => props.theme.baseGray02};
            color: unset;
         }

         svg {
            width: 24px;
            height: 24px;
            color: ${(props) => props.theme.primaryText} !important;

            path {
               stroke: ${(props) => props.theme.strongGray};
            }
         }

         &.ant-menu-item-selected {
            background-color: ${(props) => props.theme.yellow};

            .link-sidebar {
               color: ${(props) => props.theme.black};
            }

            svg {
               path {
                  stroke: ${(props) => props.theme.primaryText};
               }
            }
         }
      }

      .ant-menu-submenu-title {
         padding-left: 20px !important;
      }

      .ant-menu-submenu {
         .ant-menu-submenu-title {
            margin: 0;
            height: unset;
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
            border-radius: 10px;
            padding: 20px;
            &:hover {
               background-color: ${(props) => props.theme.baseGray02};
               color: unset;
            }

            gap: 20px;

            .ant-menu-title-content {
               margin-left: 0;
            }
         }

         &.ant-menu-submenu-active {
            color: unset;
         }
         .ant-menu-submenu-arrow {
            display: none;
         }
         &.ant-menu-submenu-selected {
            .ant-menu-submenu-title {
               background-color: ${(props) => props.theme.strongBlue};
               .link-sidebar {
                  color: ${(props) => props.theme.secondaryText};
               }
               svg {
                  path {
                     stroke: ${(props) => props.theme.secondaryText};
                  }
               }
            }
         }
         .ant-menu-sub {
            margin-left: 16px;
            margin-top: 16px;
            padding: 16px;
            padding-left: 0;
            padding-top: 0;
            word-wrap: break-word;
            background-color: inherit;
            border-left: 1px solid ${(props) => props.theme.baseGray};

            .ant-menu-item {
               font-size: 13px;
               font-weight: 500;
               padding: 12px 0px 12px 16px !important;

               &:hover,
               &.ant-menu-item-selected {
                  background-color: unset;
               }
            }
         }
      }
   }
`;

export const StyledLogo = styled.header`
   padding: 30px 0;
   z-index: 100;
`;

export const StyledImage = styled.img`
   margin: 0 auto;
   width: 150px;
   height: auto;
   display: block;
`;
