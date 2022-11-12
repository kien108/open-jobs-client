import styled from "styled-components";

export const StyledCreateAndEditHr = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;
   margin-top: 20px;

   .avatar {
      margin: 30px 0;
   }

   .icon-plus {
      cursor: pointer;
      transition: all 0.2s linear;
      path {
         fill: #8c9094;
      }

      &:hover {
         opacity: 0.7;
      }
   }

   .icon-minus {
      cursor: pointer;
      transition: all 0.2s linear;
      margin-top: 15px;

      &:hover {
         opacity: 0.8;
      }
   }

   .derived-title {
      color: black;
      font-weight: 700;
   }
`;

export const StyledEditPassword = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;
   margin-top: 20px;
`;

export const GroupButton = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 20px;
   margin-top: 12px;
`;

export const StyledNotFound = styled.div`
   display: flex;
   align-items: center;
   padding: 10px 12px;
   height: 50px;
   font-weight: normal;
   font-size: 15px;
   color: rgba(0, 0, 0, 0.25);
`;

export const StyledExtendOption = styled<any>(StyledNotFound)`
   cursor: pointer;
   transition: background 0.2s ease;
   color: ${(props) => props.theme.textDefault};

   &:hover {
      background-color: ${(props) => props.theme.baseGray02};
   }
`;

export const StyledListUnits = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;
   max-height: 200px;
   overflow-y: auto;
   padding: 2px;
   margin-top: -15px;

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
`;
