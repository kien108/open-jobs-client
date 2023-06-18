import styled from "styled-components";

export const StyledSidebar = styled.div`
   background-color: red;
   height: 100vh;
   display: flex;
   flex-direction: column;
   border-right: 1px solid #ededed;
   .link-sidebar {
      color: ${(props) => props.theme.textDefault};
      &:hover {
         color: ${(props) => props.theme.textDefault};
      }
   }

   .custom-sidebar {
      background: blue;
      border-right: 1px solid ${(props) => props.theme.baseGray};

      img {
         width: 80px !important;
      }
   }

   .custom-menu {
      overflow: auto;
      height: inherit;
      padding: 8px 16px;

      &:hover {
         overflow: overlay;
      }
      &::-webkit-scrollbar {
         width: 4px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
         background: #fff;
         border-radius: 100px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
         background: #d2d2d8;
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
            path {
               stroke: ${(props) => props.theme.strongGray};
            }
         }

         &.ant-menu-item-selected {
            transition: all 0.3s;
            background-color: ${(props) => props.theme.strongBlue};
            color: ${(props) => props.theme.secondaryText};
            .link-sidebar {
               color: ${(props) => props.theme.secondaryText};
            }

            svg {
               path {
                  stroke: ${(props) => props.theme.secondaryText};
               }
            }

            .point {
               path {
                  fill: ${(props) => props.theme.secondaryText};
               }
            }

            .parking-log {
               path {
                  fill: ${(props) => props.theme.secondaryText};
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

            .ant-menu-submenu-title {
               padding: 0px !important;
            }

            gap: 20px;
         }

         .ant-menu-submenu {
            .ant-menu-submenu-title {
               padding: 12px 0px 12px 16px !important;
               .ant-menu-title-content {
                  padding: 0px !important;
                  font-weight: 500;
                  font-size: 13px;
                  margin-left: 0px;
                  color: #1b1f3b;
               }
            }
         }

         .ant-menu-title-content {
            margin: 0px;
         }

         &.ant-menu-submenu-active {
            color: unset;
         }
         .ant-menu-submenu-arrow {
            display: none;
         }

         &.ant-menu-submenu-selected {
            & > .ant-menu-submenu-title {
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

         /* .ant-menu-submenu-title:first-child {
        background-color: red !important;
      } */

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
                  transition: all 0.3s;
                  background-color: unset;
                  .link-sidebar {
                     color: ${(props) => props.theme.strongBlue};
                  }
               }
            }
         }
      }
   }

   .ant-menu-inline-collapsed {
      padding: 8px 0px;

      .ant-menu-item,
      .ant-menu-submenu .ant-menu-submenu-title {
         padding: 6px 0 4px 0 !important;
         margin: 8px 0;
         text-align: center;
         border-radius: 0;
         min-height: unset !important;
      }

      .link-sidebar {
         position: absolute;
         inset: 0;
      }

      .ant-menu-item-icon {
         display: inline;
      }

      .ant-menu-item.ant-menu-item-selected,
      .ant-menu-submenu.ant-menu-submenu-selected .ant-menu-submenu-title {
         background: inherit;
         transition: all 0.3s;
         svg {
            width: 24px;
            height: 24px;
            fill: black;
         }

         .point {
            path {
               fill: ${(props) => props.theme.strongGray};
            }
         }

         &::before {
            position: absolute;
            content: "";
            height: 100%;
            width: 4px;
            border-radius: 5px;
            background: #074abd;
            top: 0;
            left: 0;
         }
      }

      /* .ant-menu-submenu-title {
        background: inherit;
        transition: all 0.3s;
      } */
   }
`;

export const StyledLogo = styled.header`
   padding-top: 44px;
   padding-bottom: 44px;
   background-color: ${(props) => props.theme.secondaryText};
   z-index: 100;
   transition: all 0.3s;
`;

export const StyledImage = styled.img`
   margin-left: auto;
   margin-right: auto;
   width: 160px;
   height: auto;
   display: block;
   vertical-align: middle;
`;
