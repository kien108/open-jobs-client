import { EyeIcon, Modal, Table, Title } from "../../../../../../libs/components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ContainerTable, Container, BtnFunction } from "./styles";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useGetCVAppliedByUserIdQuery } from "../../services";
import { RootState, useCommonSelector } from "./../../../../../../libs/common/redux/store";
import { useNavigate } from "react-router-dom";
import useModal from "./../../../../../../libs/common/hooks/useModal";
import { JobDetail } from "../../components/JobDetail";

const JobsApplied = () => {
   const { t } = useTranslation();
   const { id } = useCommonSelector((state: RootState) => state.user.user);
   const tableInstances = Table.useTable();
   const [dataSources, setDataSources] = useState([]);
   const navigate = useNavigate();
   const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

   const { isOpen, handleOpen, handleClose } = useModal();

   const {
      data: dataJobs,
      isLoading: loadingJobs,
      isFetching: fetchingJobs,
   } = useGetCVAppliedByUserIdQuery(
      { id, ...tableInstances.params },
      { skip: !id, refetchOnMountOrArgChange: true }
   );
   const columns: ColumnsType<any> = [
      {
         title: t("Title"),
         dataIndex: "title",
         key: "title",
         width: "30%",
         render: (value, record) => <span className="title">{value}</span>,
      },
      {
         title: t("jobPosition"),
         dataIndex: "jobPosition",
         key: "title",
         width: "30%",

         render: (value) => <span className="position">{value}</span>,
      },
      {
         title: t("companyName"),
         dataIndex: "companyName",
         key: "workPlace",
         width: "20%",
      },

      {
         title: t("appliedAt"),
         dataIndex: "createdAt",
         key: "createdAt",
         width: "20%",
         render: (item) => <span>{moment(item).format("MM/DD/YYYY")}</span>,
      },
      {
         title: t("Action"),
         dataIndex: "id",
         render: (_: string, record: any) => (
            <BtnFunction
               onClick={() => {
                  setSelectedId(record?.id);
                  handleOpen();
               }}
            >
               <EyeIcon />
            </BtnFunction>
         ),
      },
   ];

   useEffect(() => {
      console.log(dataJobs);
      const dataSource = (dataJobs?.listJob ?? []).map((item: any) => ({
         key: item?.id,
         title: item?.title,
         companyName: item?.company?.name,
         jobPosition: item?.specialization?.name,
         createAt: item?.createdAt,
         ...item,
      }));

      setDataSources(dataSource);
   }, [dataJobs]);
   return (
      <Container>
         <Title>{t(`jobsApplied`)}</Title>
         <ContainerTable>
            <Table
               columns={columns}
               dataSource={dataSources}
               tableInstance={tableInstances}
               loading={loadingJobs || fetchingJobs}
               totalElements={dataJobs?.totalElements}
               totalPages={dataJobs?.totalPages}
            />
         </ContainerTable>
         <Modal
            width="1100px"
            open={isOpen}
            onCancel={() => {
               handleClose();
               setSelectedId(undefined);
            }}
         >
            <JobDetail
               isCompany={false}
               id={selectedId}
               isApplied={true}
               handleClose={() => {
                  handleClose();
                  setSelectedId(undefined);
               }}
            />
         </Modal>
      </Container>
   );
};

export default JobsApplied;
