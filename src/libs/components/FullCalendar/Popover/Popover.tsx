import React, { FC, ReactNode } from "react";
import { Popover } from "antd";
import "./style.scss";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
interface IDataInput {
   timeIn: number | undefined;
   timeOut: number | undefined;
   totalWorkingHour: number | undefined;
   overTime: number | undefined | string;
   workingOnsite: number | undefined | string;
}
interface IHoverCard {
   data?: IDataInput;
   type?: string;
   content?: ReactNode;
   children: ReactNode;
}

const { Text } = Typography;
const SEC_IN_HOUR = 3600;
const MINUTE_IN_HOUR = 60;
const timeSecondToHour = (sec_num: number | undefined) => {
   if (typeof sec_num === "number") {
      const hours = Math.floor(sec_num / SEC_IN_HOUR);
      const minutes = Math.floor((sec_num - hours * SEC_IN_HOUR) / MINUTE_IN_HOUR);
      let hoursString = hours.toString();
      let minuteString = minutes.toString();

      if (hours < 10) {
         hoursString = "0" + hours;
      }
      if (minutes < 10) {
         minuteString = "0" + minutes;
      }
      if (isNaN(hours) || isNaN(minutes)) {
         hoursString = "";
         minuteString = "";
      }
      return `${hoursString}:${minuteString}`;
   } else {
      return "";
   }
};
const renderTotalWorkingHour = (sec_num: number | undefined) => {
   if (typeof sec_num === "number" && !isNaN(sec_num)) {
      const res = sec_num / SEC_IN_HOUR;
      return Number.isInteger(res) ? res : res.toFixed(1);
   } else {
      return "";
   }
};
const HoverBox: FC<IHoverCard> = ({ type = "default", content = null, data, ...props }) => {
   const { t, i18n } = useTranslation();
   const renderContent =
      type !== "default" || !data ? (
         <div>{content}</div>
      ) : (
         <div>
            <Typography>
               {t("popover.timein", { ns: "common" })} <Text>{timeSecondToHour(data?.timeIn)}</Text>
            </Typography>
            <Typography>
               {t("popover.timeout", { ns: "common" })}:{" "}
               <Text>{timeSecondToHour(data?.timeOut)}</Text>
            </Typography>
            <Typography>
               {t("popover.totalworking", { ns: "common" })}:{" "}
               <Text>{renderTotalWorkingHour(data?.totalWorkingHour)}</Text>
            </Typography>
            <Typography>
               {t("popover.overtime", { ns: "common" })}: <Text>{data?.overTime}</Text>
            </Typography>
            <Typography>
               {t("popover.workonsite", { ns: "common" })}: <Text>{data?.workingOnsite}</Text>
            </Typography>
         </div>
      );

   return (
      <Popover
         className="hover-card"
         trigger="hover"
         placement="right"
         content={renderContent}
         overlayClassName="hover-popup"
      >
         {props.children}
      </Popover>
   );
};
export default HoverBox;
