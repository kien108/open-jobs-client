import styled from "styled-components";

export const Container = styled.div`
   .render-content {
      .header {
         display: flex;
         align-items: center;
         gap: 20px;

         .label {
            font-weight: 600;
            margin-bottom: 4px;
            color: #1b1f3b;
            font-size: 16px;
            text-transform: uppercase;
            color: ${(props) => props.theme.strongBlue};
         }
      }
   }
   .btn-comment-submit {
      background: #ebefff !important;
      color: #526ed3 !important;
      margin-left: auto;
      margin-top: 10px;
      font-size: 11px;
      height: 26px;
      padding: 0px 15px;

      &:hover {
         background: #dfe3f3 !important;
      }
   }
`;
