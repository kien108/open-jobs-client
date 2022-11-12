import React, { useRef, useEffect, FC } from "react";

import "@fullcalendar/react/dist/vdom";
import FullCalendar, { DayCellContentArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./style.scss";
import { StarIcon } from "../Icons";
import { Typography } from "antd";
import { DateObjectType } from "./types";
import { useCommonSelector, RootState } from "../../common";

type IDateArrayInfo = Array<DateObjectType>;

interface IFullCalendar {
   dateView: Date;
   dateEvent?: IDateArrayInfo;
   HoverComponent?: React.FC<any>;
   content?: React.ReactNode;
}
const MAX_WIDTH_PERCENT = 100;

const Calendar: FC<IFullCalendar> = ({ dateView, dateEvent, HoverComponent, ...props }) => {
   const calendarRef = useRef<FullCalendar>(null!);
   useEffect(() => {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(dateView);
   }, [dateView]);

   const { lang } = useCommonSelector((state: RootState) => state.lang);

   const renderDayCell = (dayCellContent: DayCellContentArg) => {
      if (!dateEvent || dateEvent.length === 0)
         return (
            <>
               <span className="day-number">{dayCellContent.dayNumberText}</span>
               {HoverComponent && (
                  <HoverComponent type="other" content={props.content}>
                     <div className="hover-area"></div>
                  </HoverComponent>
               )}
            </>
         );

      let width = "";

      const time = dateEvent?.find(
         (item) => item?.trackingDate === dayCellContent?.date?.getTime()
      );

      const isRenderProgressBackground =
         (time && !time.isWeekend) || (time && time?.isWeekend && time?.ot);

      const backGroundProgress = isRenderProgressBackground ? (
         <div className="progress progress-background"></div>
      ) : null;

      const leaveInfo = time?.leaveType ? (
         <Typography className="leave-type">{time?.leaveType}</Typography>
      ) : null;

      const holidayInfo = time?.isHoliday ? (
         <Typography className="holiday">
            <StarIcon style={{ margin: "0 2px" }} />
            {time?.holidayName}
         </Typography>
      ) : null;

      if (time) {
         width = (time?.workingDay ? time?.workingDay : 0) * MAX_WIDTH_PERCENT + "%";
      }

      const hoverCardContent =
         time && HoverComponent ? (
            <HoverComponent
               data={{
                  timeIn: time?.inTime,
                  timeOut: time?.outTime,
                  totalWorkingHour: time?.totalWorkingTime,
                  overTime: time?.ot ? time?.ot : "",
                  workingOnsite: time?.onsiteDay ? time?.onsiteDay : "",
               }}
            >
               <div className="hover-area"></div>
            </HoverComponent>
         ) : null;

      return (
         <>
            <span className="day-number">{dayCellContent.dayNumberText}</span>

            {holidayInfo}
            {leaveInfo}

            <div
               className={time?.isHoliday ? "progress-holiday progress" : "progress"}
               style={{ width: time?.isHoliday ? "100%" : width }}
            ></div>

            {backGroundProgress}
            {hoverCardContent}
         </>
      );
   };

   return (
      <FullCalendar
         loading={(isLoading) => {
            isLoading == true;
         }}
         locale={lang}
         expandRows
         plugins={[dayGridPlugin]}
         initialView="dayGridMonth"
         headerToolbar={{
            start: "prev",
            center: "title",
            end: "next",
         }}
         ref={calendarRef}
         dayCellContent={renderDayCell}
         fixedWeekCount={false}
         height={750}
         dayHeaderFormat={{ weekday: "long" }}
      />
   );
};

export default Calendar;
Calendar.defaultProps = {
   dateView: new Date(),
};
