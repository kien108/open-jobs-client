import styled from 'styled-components';

export const ContentStyled = styled.div`
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;

  .head {
    margin-left: 16px;
    margin-right: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .ant-tabs {
      flex: 1 1;
      display: flex;

      .ant-tabs-nav {
        margin-bottom: 0;
      }
    }

    label {
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      position: absolute;
      right: 0;
      font-size: 13px;
      line-height: 19.5px;

      .ant-switch {
        height: 16px;
        width: 32px;
        min-height: 100%;
        background-color: #ebefff;
        background-image: none;

        &.ant-switch-checked {
          background-color: ${(props) => props.theme.strongBlue};
        }

        .ant-switch-inner {
          svg {
            margin-top: 2px;
            z-index: -1;
            pointer-events: none;
            transform: rotate(90deg);

            path {
              fill: ${(props) => props.theme.strongGray};
            }
          }

          .active {
            path {
              fill: ${(props) => props.theme.secondaryText};
            }
          }
        }
      }
    }
  }

  .scrollbar {
    max-height: 400px;
    z-index: 0;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 14px;
      cursor: pointer !important;
    }

    ::-webkit-scrollbar-thumb {
      height: 34%;
      width: 12px;
      min-height: 20px;
      background: ${(props) => props.theme.strongGray};
      border-radius: 100px;
      border: 4px solid transparent;
      opacity: 0.2;
      background-clip: content-box;
      cursor: pointer !important;
      transition-property: width, height;
      pointer-events: auto;

      &:hover {
        width: 14px;
        cursor: pointer !important;
      }
    }

    .ant-list {
      border: none;

      .ant-list-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        border: none;
        cursor: pointer;
        padding: 20px;

        &.unread {
          background-color: #f0f8ff;
        }

        .more-button {
          opacity: 0;

          path {
            fill: #526ed3;
          }
        }

        &:hover {
          background-color: #d3e9ff;

          .more-button {
            opacity: 1;
          }
        }

        .main {
          flex: 1 1;

          .notification-item {
            font-size: 16px;
            line-height: 24px;
            margin-bottom: 8px;
            font-family: 'Inter', -apple-system, 'BlinkMacSystemFont', system-ui, 'Roboto',
              'Segoe UI', 'Helvetica Neue', sans-serif;
          }
        }

        .dot-read {
          position: absolute;
          left: 12px;
          top: 12px;
          width: 12px;
          height: 12px;
          background-color: red;
          border-radius: 50%;
        }

        p {
          color: #526ed3;
          font-size: 12px;
          line-height: 16px;
          margin: 0;
        }
      }
    }
  }

  path {
    fill: #074abd;
  }
`;
