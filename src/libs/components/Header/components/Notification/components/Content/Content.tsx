import { useState } from "react";
import { ContentStyled } from "./styles";
import { List, Switch, Typography } from "antd";
import { TabsCommonContentType } from "../../../../../../common";
import { DataListType } from "../../Notification";
import { useTranslation } from "react-i18next";
import { Popover } from "../../../Popover";
import { RemoveIcon, TripOriginIcon, MoreHorizIcon } from "../../../../../Icons";
import { Tabs, Image } from "../../../../../../components";

const { Text } = Typography;

interface ContentProps {
   onChangeTabs: (key: string) => void;
   onChangeSwitch: (checked: boolean) => void;
   dataList: DataListType[];
   onMarkRead: (id: string) => void;
   onRemoveNotification: (id: string) => void;
}

const tabsNotifiContent: TabsCommonContentType[] = [
   {
      id: 1,
      title: "notification.new",
   },
   {
      id: 2,
      title: "notification.requestSubmission",
   },
];
const Content = ({
   onChangeTabs,
   onChangeSwitch,
   dataList,
   onMarkRead,
   onRemoveNotification,
}: ContentProps) => {
   const { t } = useTranslation();
   const [popoverID, setPopoverID] = useState<number | null>(null);

   const handleVisibleChange = (newVisible: number | null) => {
      setPopoverID(newVisible);
   };

   return (
      <ContentStyled>
         <div className="head">
            <Tabs contentCommon={tabsNotifiContent} onChange={(key: string) => onChangeTabs(key)} />
            <label>
               {t("notification.onlyShowUnread")}
               <Switch
                  size="small"
                  defaultChecked={false}
                  checkedChildren={<RemoveIcon width={12} height={12} className="active" />}
                  unCheckedChildren={<TripOriginIcon width={12} height={12} />}
                  onChange={onChangeSwitch}
               />
            </label>
         </div>
         <div className="scrollbar">
            <List
               size="large"
               bordered
               dataSource={dataList}
               renderItem={(item) => (
                  <List.Item className={item.isRead ? "" : "unread"}>
                     <Image width="48px" src={item.img} />
                     <div className="main">
                        <div className="notification-item">{item.title}</div>
                        <p>{item.time}</p>
                     </div>
                     <Popover
                        overlayClassName="styled-header-popover"
                        trigger="click"
                        visible={item.id === popoverID}
                        onVisibleChange={() =>
                           handleVisibleChange(item.id === popoverID ? null : item.id)
                        }
                        content={
                           <div className="dropdown-group-btn">
                              {!item.isRead && (
                                 <button
                                    className="button-content"
                                    onClick={() => {
                                       onMarkRead(item.id.toString());
                                       setPopoverID(null);
                                    }}
                                 >
                                    <Text>{t("notification.markAsRead")}</Text>
                                 </button>
                              )}

                              <button
                                 className="button-content"
                                 onClick={() => {
                                    onRemoveNotification(item.id.toString());
                                    setPopoverID(null);
                                 }}
                              >
                                 <Text>{t("notification.removeTheNotification")}</Text>
                              </button>
                           </div>
                        }
                     >
                        <button
                           className="more-button button-header"
                           onClick={() => {
                              setPopoverID(item.id);
                           }}
                        >
                           <MoreHorizIcon />
                        </button>
                     </Popover>
                     {!item.isRead && <div className="dot-read"></div>}
                  </List.Item>
               )}
            ></List>
         </div>
      </ContentStyled>
   );
};

export default Content;
