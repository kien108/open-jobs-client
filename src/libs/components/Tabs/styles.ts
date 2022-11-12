import styled, { StyledComponent } from 'styled-components';
import { Tabs } from 'antd';

export const StyledTabs: StyledComponent<any, any> = styled(Tabs)`
  position: relative;
  display: flex;
  font-size: 15px;
  line-height: 24px;
  color: ${(props) => props.theme.strongGray};

  .ant-tabs-nav {
    min-height: 56px;

    .ant-tabs-tab.ant-tabs-tab-active {
      .ant-tabs-tab-btn {
        color: ${(props) => props.theme.strongBlue} !important;

        path {
          fill: ${(props) => props.theme.strongBlue} !important;
        }
      }
    }

    .ant-tabs-nav-operations {
      display: none;
    }

    .ant-tabs-tab {
      padding: 0;
      color: inherit;

      &:hover {
        color: ${(props) => props.theme.primaryText};

        path {
          fill: ${(props) => props.theme.primaryText} !important;
        }
      }

      .ant-tabs-tab-btn {
        height: 100%;
        display: flex;

        a {
          color: ${(props) => props.theme.strongGray};

          &.active {
            color: ${(props) => props.theme.strongBlue} !important;
          }

          &:hover {
            color: ${(props) => props.theme.primaryText};

            path {
              fill: ${(props) => props.theme.primaryText} !important;
            }
          }

          display: flex;
          height: 100%;
          align-items: center;
          justify-content: center;
        }
      }

      .ant-typography {
        color: inherit;
        font-size: 15px;
        white-space: nowrap;
        cursor: pointer;
        line-height: 24px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        path {
          fill: ${(props) => props.theme.strongGray};
          transition: fill 300ms ease-in-out;
        }
      }
    }
  }

  .ant-tabs-ink-bar {
    background-color: ${(props) => props.theme.strongBlue};
  }
`;
