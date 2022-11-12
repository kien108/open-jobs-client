import { CloseIcon, Title } from "../../components";
import { ModalProps as AntdModalProps } from "antd";
import { ReactNode } from "react";
import StyledModal from "./styles";

export interface ModalProps extends AntdModalProps {
   type?: "default" | "confirm";
   confirmIcon?: ReactNode;
   width?: string;
}

const Modal = ({ type = "default", ...props }: ModalProps) => {
   return (
      <StyledModal
         {...props}
         width={props.width}
         centered
         maskStyle={{ backgroundColor: "rgb(0 0 0 / 75%)" }}
         footer={null}
         transitionName=""
         title={null}
         type={type}
         closable={type === "confirm" ? false : true}
         closeIcon={<CloseIcon />}
      >
         {props.confirmIcon && type === "confirm" && (
            <>
               <div className="modal-confirm__icon">
                  <div>{props.confirmIcon}</div>
               </div>
               <Title level={4} className="modal-confirm__title">
                  {props.title}
               </Title>
            </>
         )}
         {type === "default" ? <Title>{props.title}</Title> : null}
         {props.children}
      </StyledModal>
   );
};

export default Modal;
