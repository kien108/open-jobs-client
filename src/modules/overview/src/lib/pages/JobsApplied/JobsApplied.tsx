import {
   Button,
   DeleteIcon,
   EyeIcon,
   Modal,
   openNotification,
   Table,
   Title,
} from "../../../../../../libs/components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ContainerTable, Container, BtnFunction } from "./styles";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useCancelApplyCVMutation, useGetCVAppliedByUserIdQuery } from "../../services";
import { RootState, useCommonSelector } from "./../../../../../../libs/common/redux/store";
import { useNavigate } from "react-router-dom";
import useModal from "./../../../../../../libs/common/hooks/useModal";
import { JobDetail } from "../../components/JobDetail";
import { GroupButton } from "../../components/CV/styles";
import { FilterAppliedJob } from "../../components";
import { useFilterAppliedJob } from "../../hooks";

const JobsApplied = () => {
   const { t } = useTranslation();
   const user = useCommonSelector((state: RootState) => state.user.user);
   const tableInstances = Table.useTable();
   const [dataSources, setDataSources] = useState([]);

   const navigate = useNavigate();
   const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

   const { isOpen, handleOpen, handleClose } = useModal();
   const {
      isOpen: isOpenDelete,
      handleClose: handleCloseDelete,
      handleOpen: handleOpenDeleteModal,
   } = useModal();

   const {
      data: dataJobs,
      isLoading: loadingJobs,
      isFetching: fetchingJobs,
   } = useGetCVAppliedByUserIdQuery(
      { id: user?.id, ...tableInstances.params, ...useFilterAppliedJob() },
      { skip: !user?.id, refetchOnMountOrArgChange: true }
   );

   const [cancelAppliedCV, { isLoading: loadingCancel }] = useCancelApplyCVMutation();

   const columns: ColumnsType<any> = [
      {
         title: "Tiêu đề",
         dataIndex: "title",
         key: "title",
         render: (value, record) => (
            <span
               className="title"
               style={{ cursor: "pointer" }}
               onClick={() => navigate(`/overview/job-detail/${record?.job?.id}`)}
            >
               {value}
            </span>
         ),
      },
      {
         title: "Vị trí ứng tuyển",
         dataIndex: "jobPosition",
         key: "title",

         render: (value) => <span className="position">{value}</span>,
      },
      {
         title: "Tên công ty",
         dataIndex: "companyName",
         key: "workPlace",
         render: (value, record) => (
            <span
               className="title"
               style={{ cursor: "pointer" }}
               onClick={() => navigate(`/overview/companies/${record?.job?.company?.id}`)}
            >
               {value}
            </span>
         ),
      },

      {
         title: "Ứng tuyển vào",
         dataIndex: "applyDate",
         key: "applyDate",
         render: (item) => <span>{moment(item).format("DD/MM/YYYY")}</span>,
      },
      {
         title: "Trạng thái tin",
         dataIndex: "status",
         key: "status",
         render: (value) => <div className={`badge-status ${value ? value : ""}`}>{value}</div>,
      },
      {
         title: "Thao tác",
         dataIndex: "id",
         align: "center",
         render: (_: string, record: any) => (
            <GroupButton>
               <BtnFunction
                  onClick={() => {
                     setSelectedId(record?.job?.id);
                     handleOpen();
                  }}
               >
                  <EyeIcon />
               </BtnFunction>
               <BtnFunction
                  onClick={() => {
                     handleOpenDeleteModal();
                     setSelectedId(record?.job?.id);
                  }}
               >
                  <DeleteIcon />
               </BtnFunction>
            </GroupButton>
         ),
      },
   ];

   useEffect(() => {
      if (user?.cv?.title) return;

      navigate("/overview/welcome");
   }, []);
   const handleConfirmCancel = () => {
      selectedId &&
         cancelAppliedCV({ cvId: user?.cv?.id, jobId: selectedId })
            .unwrap()
            .then(() => {
               openNotification({
                  type: "success",
                  message: t("Hủy đơn ứng tuyển thành công!!!"),
               });
               setSelectedId(undefined);
               handleCloseDelete();
            })
            .catch((error) => {
               openNotification({
                  type: "error",
                  message: t("common:ERRORS.SERVER_ERROR"),
               });
            });
   };

   useEffect(() => {
      const dataSource = (dataJobs?.listJobCv ?? []).map((item: any) => ({
         ...item,

         key: item?.id,
         title: item?.job?.title,
         companyName: item?.job?.company?.name,
         jobPosition: item?.job?.specialization?.name,
         createAt: item?.createdAt,
         status: item?.status === "HIDDEN" ? "Đã đóng" : "Đang tuyển",
      }));

      setDataSources(dataSource);
   }, [dataJobs]);

   return (
      <Container>
         <Title>Việc đã ứng tuyển</Title>
         <ContainerTable>
            <FilterAppliedJob />
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
            destroyOnClose
            title={
               <span style={{ marginBottom: "20px", display: "block" }}>Chi tiết công việc</span>
            }
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
         <Modal
            type="confirm"
            open={isOpenDelete}
            onCancel={() => {
               handleCloseDelete();
            }}
            confirmIcon="?"
            title={t("Bạn có muốn hủy ứng tuyển không?")}
         >
            <GroupButton>
               <Button
                  height={44}
                  style={{ padding: "0 24px" }}
                  key="back"
                  border="outline"
                  onClick={() => {
                     setSelectedId(undefined);
                     handleCloseDelete();
                  }}
               >
                  Hủy
               </Button>
               <Button
                  height={44}
                  key="submit"
                  loading={loadingCancel}
                  onClick={handleConfirmCancel}
               >
                  Đồng ý
               </Button>
            </GroupButton>
         </Modal>
      </Container>
   );
};

export default JobsApplied;
