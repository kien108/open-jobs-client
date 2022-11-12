import { Table } from 'antd';
import styled, { StyledComponent } from 'styled-components';

export const StyledTable: StyledComponent<any, any> = styled(Table)<any>`
  height: auto;

  .ant-table-thead {
    & > tr {
      & > th {
        font-weight: 700;
        background-color: #fff;
      }

      & > th:before {
        background-color: #fff !important;
      }
    }
  }

  .ant-table-tbody {
    tr {
      td {
        word-wrap: break-word;
        word-break: break-word;
      }
    }
    color: ${(props) => props.theme.primaryText};

    .ant-space-item {
      cursor: pointer;
    }

    .ant-pagination {
      .ant-table-pagination {
        .ant-pagination-item {
          display: none !important;
        }
      }
    }
  }

  .ant-table-column-sorter-up,
  .ant-table-column-sorter-down {
    svg {
      display: none;
    }
  }

  /* .ant-table-column-sorter,
  .ant-table-column-sorter-full {
    margin-left: 34px;
  } */

  .ant-table-column-title {
    flex: unset;
  }

  .ant-table-column-sorter {
    margin-left: 8px;
  }

  .ant-table-column-sorters {
    justify-content: unset;

    .ant-table-column-sorter-up.active {
      border: 0.1rem solid ${(props) => props.theme.baseGray03};
      border-bottom: 0;
      border-right: 0;
      height: 9px;
      width: 9px;
      transform: translateY(3px) rotate(45deg);
    }

    .ant-table-column-sorter-down.active {
      border: 0.1rem solid ${(props) => props.theme.baseGray03};
      border-bottom: 0;
      border-right: 0;
      height: 9px;
      width: 9px;
      transform: translateY(-1px) rotate(225deg);
    }
  }

  .ant-table-cell {
    &.custom-align-center {
      .ant-table-column-sorters {
        justify-content: center;
      }
    }

    &.custom-align-left {
      .ant-table-column-sorters {
        justify-content: start;
      }
    }

    &.custom-align-right {
      .ant-table-column-sorters {
        justify-content: end;
      }
    }
  }
`;
