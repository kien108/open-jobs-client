import styled from "styled-components";

export const Container = styled.div`
   .select-skill {
      .ant-select {
         height: 60px;
      }

      .ant-select-selection-overflow {
         .ant-select-selection-item {
            background: #074abd;
            color: #fff;
            border-radius: 10px;
            justify-content: center;
            align-items: center;
            padding: 0 12px;
            height: 32px;

            .ant-select-selection-item-remove {
               color: #fff;
            }
         }
      }

      .dropdown-style .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
         background-color: #e6f7ff !important;
      }
   }
`;
