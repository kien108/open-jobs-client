import React, { FC, ReactNode } from "react";
import { Container } from "./styles";

interface IProps {
   icon?: ReactNode;
   title: string;
}
const Title: FC<IProps> = ({ icon, title }) => {
   return (
      <Container>
         {icon && icon}

         <span className="title">{title}</span>
      </Container>
   );
};

export default Title;
