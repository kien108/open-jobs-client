import styled from 'styled-components';
import { Popover } from 'antd';

export const StyledPopover = styled(Popover)`
  .button-header {
    height: 44px;
    width: 44px;
    border-radius: 10px;
    cursor: pointer;
    padding: 0;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    transition: background 300ms ease-in-out;

    &.hover {
      &:active,
      &:hover {
        background-color: #dfe3f3;
      }
    }

    .text-image {
      width: 32px;
      height: 32px;
      border-radius: 100%;
      background-color: #d8ddf2;
      display: flex;
      line-height: 24px;
      font-size: 15px;
      align-items: center;
      justify-content: center;
    }

    path {
      height: 30px;
      width: 36px;
      fill: #536fd3;
    }
  }
`;
