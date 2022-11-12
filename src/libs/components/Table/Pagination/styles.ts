import styled from 'styled-components';

export const StyledPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 6px 16px 0;

  .total-page {
    .total {
      color: ${(props) => props.theme.strongGray};
      font-size: 13px;

      .page-current {
        color: #000;
        font-weight: 700;
      }
    }
  }

  .pagination-content {
    .ant-pagination {
      .ant-pagination-item {
        display: none;
      }

      .ant-pagination-total-text {
        font-size: 13px;

        .text {
          color: ${(props) => props.theme.strongGray};

          .page-number {
            color: ${(props) => props.theme.blue};
            font-weight: 600;
            cursor: pointer;
          }

          .page-total {
            color: #000;
            font-weight: 700;
          }
        }
      }

      .ant-pagination-options {
        display: none;
      }

      .ant-pagination-prev,
      .ant-pagination-next {
        margin: 0;

        .ant-pagination-item-link {
          border: none;
          font-weight: 600;
        }

        .ant-pagination-item-link:hover {
          color: ${(props) => props.theme.strongGray};
        }
      }

      .ant-pagination-disabled .ant-pagination-item-link,
      .ant-pagination-disabled:hover .ant-pagination-item-link {
        cursor: default;
      }

      .ant-pagination-jump-prev,
      .ant-pagination-jump-next {
        display: none;
      }
    }
  }
`;
