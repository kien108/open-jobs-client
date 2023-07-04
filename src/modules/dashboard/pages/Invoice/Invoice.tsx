import { Table, TextEllipsis, Title } from "../../../../libs/components";
import React, { useEffect, useState } from "react";
import { Content } from "./styles";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useCommonSelector, RootState } from "../../../../libs/common";
import { useGetHistoryQuery } from "../../services";
import { FilterInvoice } from "../../components";
import { useFilterInvoice } from "../../hooks";

export enum EServiceType {
   COIN_IN = "COIN_IN",
   JOB_POST = "JOB_POST",
   VIEW_CV = "VIEW_CV",
   UPGRADE_MEMBERSHIP = "UPGRADE_MEMBERSHIP",
   REFUND = "REFUND",
   UPDATE_JOB = "UPDATE_JOB",
}

export const EServiceTypeTranslate = {
   COIN_IN: "Nạp tiền",
   JOB_POST: "Đăng tin tuyển dụng",
   VIEW_CV: "Xem hồ sơ",
   UPGRADE_MEMBERSHIP: "Nâng cấp gói hội viên",
   REFUND: "Hoàn trả tiền",
   UPDATE_JOB: "Cập nhật tin tuyển dụng",
};
const Invoice = () => {
   const { t } = useTranslation();
   const [dataSource, setDataSource] = useState<any>([]);
   const tableInstance = Table.useTable();
   const { user } = useCommonSelector((state: RootState) => state.user);

   const columns: ColumnsType<any> = [
      {
         title: "Người dùng",
         dataIndex: "companyName",
         key: "companyName",
         sorter: true,
         render: (value) => <span className="name">{value}</span>,
      },
      {
         title: "Loại dịch vụ",
         dataIndex: "serviceTypeTranslate",
         key: "serviceTypeTranslate",
      },
      {
         title: "Ngày giao dịch",
         dataIndex: "createdAt",
         key: "createdAt",
      },
      {
         title: "Số tiền",
         dataIndex: "amount",
         key: "amount",
         render: (item, record) => (
            <span
               className={`service ${getFormatPrice(record?.serviceType) ? "income" : "outcome"}`}
            >
               {getFormatPrice(record?.serviceType) ? `+${item}` : `-${item}`}
            </span>
         ),
      },

      {
         title: "Người thực hiện",
         dataIndex: "createdBy",
         key: "createdBy",
         render: (item) => <span className="salary">{item}</span>,
      },
   ];

   const getFormatPrice = (serviceType: EServiceType) => {
      const incomes = [EServiceType.COIN_IN, EServiceType.REFUND, EServiceType];

      return incomes.includes(serviceType);
   };

   const { data: dataHistory, isFetching: fetchingHistory } = useGetHistoryQuery(
      { companyId: user?.companyId, ...tableInstance.params, ...useFilterInvoice() },
      { refetchOnMountOrArgChange: true, skip: !user?.companyId }
   );

   useEffect(() => {
      const dataSource = dataHistory?.content?.map((item) => ({
         ...item,
         key: item?.id,
         createdAt: item?.createdAt ? moment(item?.createdAt).format("DD/MM/YYYY") : "--",
         serviceTypeTranslate: EServiceTypeTranslate[item?.serviceType as any] as any,
         amount: parseFloat(item?.amount).toFixed(1),
      }));

      setDataSource(dataSource);
   }, [dataHistory]);
   return (
      <div>
         <Title>Lịch sử giao dịch</Title>

         <Content>
            <FilterInvoice />
            <Table
               columns={columns}
               dataSource={dataSource}
               tableInstance={tableInstance}
               loading={fetchingHistory}
               totalElements={dataHistory?.totalElements || 0}
               totalPages={dataHistory?.totalPages || 0}
            />
         </Content>
      </div>
   );
};

export default Invoice;
