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

   .title-container {
      display: flex;
      align-items: center;
      gap: 20px;
   }

   .label {
      font-weight: 700;
      font-size: 17px;
      min-width: 80px;
   }

   .value {
      font-size: 17px;
   }

   .go-to-cvs {
      display: block;
      font-weight: 500;
      font-weight: 18px;
      cursor: pointer;
      text-decoration: underline;
      font-style: italic;
      text-align: center;
      color: ${(props) => props.theme.strongBlue};
      transition: 0.2s all linear;

      &:hover {
         opacity: 0.7;
      }
   }
`;

export const StyledEditPassword = styled.div`
   display: flex;
   flex-direction: column;
   gap: 25px;
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

export const BtnFunction = styled.div`
   cursor: pointer;
   width: 44px;
   height: 44px;
   display: flex;
   align-items: center;
   justify-content: center;
   color: black;
   transform: translateX(15px);
   margin-left: auto;
   margin-top: 20px;
   border-radius: 10px;
   transition: all 0.3s;

   &.btn-back {
      margin-left: 140px;
   }

   &.btn-remove {
      margin-top: 0px;
      transform: translateX(0);
   }

   .icon-password {
      path:first-child {
         fill: #fff;
      }
   }

   &:hover {
      background: ${(props) => props.theme.softBlue};
      svg {
         path {
            fill: ${(props) => props.theme.blueHover};
         }
      }
   }
`;
