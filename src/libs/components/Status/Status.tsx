import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyledStatus, StyledText } from "./styles";

export interface IStatus {
   isActive?: boolean;
   activeMsg?: string;
   inactiveMsg?: string;
}

const Status: FC<IStatus> = ({ isActive, activeMsg, inactiveMsg }) => {
   const { t } = useTranslation();

   return (
      <StyledStatus isActive={isActive}>
         <StyledText>
            {isActive ? activeMsg || "Kích hoạt" : inactiveMsg || "Vô hiệu hóa"}
         </StyledText>
      </StyledStatus>
   );
};

export default Status;
