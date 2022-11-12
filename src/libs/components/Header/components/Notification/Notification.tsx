import React, { useState } from "react";
import { StyledNotification } from "./styles";
import logo from "../../../../../assets/img/logo.png";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";

export interface DataListType {
   id: number;
   img: string;
   title: string;
   time: string;
   isRead: boolean;
}

const dataNew: DataListType[] = [
   {
      id: 1,
      img: logo,
      title: "Don't forget to log your work hours on Jira",
      time: "3 days ago",
      isRead: false,
   },
   {
      id: 2,
      img: logo,
      title: "Your Employee Info has been edited by Lam Thu Nguyen. Check your email for detail of the changes",
      time: "3 days ago",
      isRead: false,
   },
   {
      id: 3,
      img: logo,
      title: "Your Employee Info has been edited by Lam Thu Nguyen. Check your email for detail of the changes",
      time: "3 days ago",
      isRead: true,
   },
   {
      id: 4,
      img: logo,
      title: "Your Employee Info has been edited by Lam Thu Nguyen. Check your email for detail of the changes",
      time: "3 days ago",
      isRead: false,
   },
   {
      id: 5,
      img: logo,
      title: "Your Employee Info has been edited by Lam Thu Nguyen. Check your email for detail of the changes",
      time: "3 days ago",
      isRead: false,
   },
];
const dataRequest: DataListType[] = [
   {
      id: 1,
      img: logo,
      title: "Tran Tuan Khai 's request of Update Timesheet has approved by Nguyen Thanh Son",
      time: "3 days ago",
      isRead: false,
   },
   {
      id: 2,
      img: logo,
      title: "Your Employee Info has been edited by Lam Thu Nguyen. Check your email for detail of the changes",
      time: "3 days ago",
      isRead: false,
   },
   {
      id: 3,
      img: logo,
      title: "Your Employee Info has been edited by Lam Thu Nguyen. Check your email for detail of the changes",
      time: "3 days ago",
      isRead: true,
   },
];

const Notification = () => {
   const [dataList, setDataList] = useState<DataListType[]>(dataNew);
   const [tabsContent, setTabsContent] = useState<string>("new");
   // const [checkedRead, setCheckedRead] = useState<boolean>(false);

   const onChangeTabs = (key: string) => {
      if (key === "1") {
         setTabsContent("new");
         setDataList(dataNew);
      } else {
         setTabsContent("requestSubmission");
         setDataList(dataRequest);
      }
   };

   const onChangeSwitch = (checked: boolean) => {
      if (checked) {
         // setCheckedRead(true);
         setDataList((datas) => datas.filter((data) => !data.isRead));
      } else {
         // setCheckedRead(false);
         if (tabsContent === "new") {
            setDataList(dataNew);
         } else {
            setDataList(dataRequest);
         }
      }
   };

   const onMarkRead = (id: string) => {
      console.log(id);
   };

   const onRemoveNotification = (id: string) => {
      console.log(id);
   };

   return (
      <StyledNotification>
         <section>
            <Header />
            <Content
               onChangeTabs={onChangeTabs}
               onChangeSwitch={onChangeSwitch}
               dataList={dataList}
               onMarkRead={onMarkRead}
               onRemoveNotification={onRemoveNotification}
            />
            <Footer tabsContent={tabsContent} />
         </section>
      </StyledNotification>
   );
};

export default Notification;
