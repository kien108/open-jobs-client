import styled from 'styled-components';
import { Tabs } from 'antd';

export const StyledTabs = styled.div`
  position: relative;
  z-index: 0;
  height: 56px;
  box-shadow: inset 0 -1px #ededed;
  color: rgba(27, 31, 59, 0.65);
  font-family: 'Inter', -apple-system, 'BlinkMacSystemFont', system-ui, 'Roboto', 'Segoe UI',
    'Helvetica Neue', sans-serif;

  .ant-tabs-content {
    display: none;
  }
`;

export const StyledContainerLink = styled(Tabs)`
  height: 56px;

  .ant-tabs-nav {
    margin: 0 !important;

    &::before {
      display: none;
    }
  }

  .ant-tabs-tab {
    padding: 0;

    &:hover {
      .custom-link-header {
        color: ${(props) => props.theme.textDefault};
      }
    }
  }

  .custom-link-header {
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    color: rgba(27, 31, 59, 0.65);
    font-family: 'Inter', -apple-system, 'BlinkMacSystemFont', system-ui, 'Roboto', 'Segoe UI',
      'Helvetica Neue', sans-serif;
    text-shadow: none;
  }

  .ant-tabs-tab-active {
    .custom-link-header {
      color: ${(props) => props.theme.strongBlue};

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
