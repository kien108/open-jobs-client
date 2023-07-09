import styled from "styled-components";
import loginBg from "../../assets/login-bg.svg";

export const ContainerLogin = styled.div`
   position: relative;
   display: block;
   height: 100vh;
   background: url(${loginBg}) no-repeat;
   background-size: cover;
   user-select: none;
`;
export const StyledForm = styled.form`
   padding: 20px 40px 40px 40px;
   background-color: rgb(255 255 255 / 1);
   border-radius: 10px;
   width: 550px;
   height: fit-content;
   margin: auto;
   position: absolute;
   top: 0px;
   right: 0px;
   bottom: 0px;
   left: 0px;
   box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);

   .btn-back {
      padding: 0px 15px;
      height: 30px;
      font-weight: 400;
      font-size: 14px;
      display: flex;
      align-items: center;

      svg {
         transform: translateY(-3px);
      }
   }
`;
export const StyledLogo = styled.img`
   margin-left: auto;
   margin-right: auto;
   width: 240px;
   height: auto;
   display: block;
   user-select: none;
   margin-bottom: -80px;
`;
export const StyledGroupRemembers = styled.div`
   display: flex;
   align-items: center;
   margin-top: 20px;
`;
export const LabelRemember = styled.label`
   font-weight: 600;
   margin-left: 10px;
   color: ${(props) => props.theme.textDefault};
   font-size: 14px;
   cursor: pointer;
`;
export const Contact = styled.p`
   margin-top: 30px;
   text-align: center;
   font-size: 16px;

   &.register {
      margin-top: 10px;
      margin-bottom: 0px;
   }

   a {
      font-weight: 600;
      color: ${(props) => props.theme.strongBlue};
      transition: all 0.2s linear;

      &:hover {
         opacity: 0.9;
      }
   }
`;
export const StyledButton = styled.div`
   margin-top: 24px;
   button {
      width: 100%;
   }
`;
export const InputMessageStyled = styled.span`
   font-size: 13px;
   line-height: 20px;
   color: ${(props) => props.theme.red};
   display: inline-block;
   margin-top: 4px;
   width: 100% !important;
   text-align: left;
`;
