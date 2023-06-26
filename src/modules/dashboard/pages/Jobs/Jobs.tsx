import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";

import moment from "moment";
import { RootState, useCommonSelector, useModal } from "../../../../libs/common";
import {
   Button,
   DeleteIcon,
   EditIcon,
   EyeIcon,
   EyePwIcon,
   Input,
   Modal,
   openNotification,
   SearchIcon,
   Status,
   Table,
   TextEllipsis,
   Title,
} from "../../../../libs/components";

import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { BtnFunction, ContainerTable, StyledDetail, StyledFunctions, StyledModal } from "./styles";
// import { useDeActivateMutation, useGetCompaniesQuery } from "../services";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { ICompany } from "../types";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { debounce } from "lodash";
import { GroupButton } from "../../components/modal/styles";
import { MdOutlinePassword, MdOutlineUpdate } from "react-icons/md";
import { CreateJob, EditJob, JobPost } from "../../components/modal";
import {
   useGetJobsQuery,
   useGetMajorsQuery,
   useGetSkillsQuery,
   useGetSpecializationsQuery,
} from "../../services";
import { useDeleteJobMutation, useGetJobCompanyQuery } from "../../services/JobAPIDashBoard";
import ModalRenewal from "../../components/modal/ModalRenewal";
import { convertPrice } from "../../utils";
import { IJob } from "../../types/JobModel";
import { FilterJobs } from "../../components";
import { useFilter } from "../../hooks";

type FormType = {
   listSkill: any;
   objective: string;
   education: string;
   experience: string;
   certificate: string;
   majorId: string;
   specializationId: string;
   title: string;
};

const Jobs = () => {
   const { t } = useTranslation();
   const tableInstance = Table.useTable();
   const [dataSource, setDataSource] = useState<any>([]);
   const [selectedId, setSelectedId] = useState<string | undefined>("");
   const [selectedExpired, setSelectedExpired] = useState<any>("");
   const navigate = useNavigate();

   const { user } = useCommonSelector((state: RootState) => state.user);
   const { isOpen, handleOpen, handleClose } = useModal();

   const [searchParams, setSearchParams] = useSearchParams();

   const {
      data: dataCompany,
      isLoading,
      isFetching,
   } = useGetJobCompanyQuery(
      { id: user?.companyId, ...tableInstance.params, ...useFilter() },
      {
         refetchOnMountOrArgChange: true,
         skip: !user?.companyId,
      }
   );

   const form = useForm({
      defaultValues: {
         keyword: searchParams.get("keyword"),
      },
      resolver: yupResolver(
         yup.object({
            keyword: yup.string(),
         })
      ),
   });

   const {
      isOpen: isOpenDetail,
      handleClose: handleCloseDetail,
      handleOpen: handleOpenDetailModal,
   } = useModal();

   const {
      isOpen: isOpenEdit,
      handleClose: handleCloseEdit,
      handleOpen: handleOpenEdit,
   } = useModal();

   const {
      isOpen: isOpenDelete,
      handleClose: handleCloseDelete,
      handleOpen: handleOpenDeleteModal,
   } = useModal();

   const {
      isOpen: isOpenRenewal,
      handleClose: handleCloseRenewal,
      handleOpen: handleOpenRenewalModal,
   } = useModal();

   const [deleteJob, { isLoading: loadingDeleteJob }] = useDeleteJobMutation();

   const columns: ColumnsType<any> = [
      {
         title: t("Tiêu đề"),
         dataIndex: "title",
         key: "title",
         sorter: true,
         width: "20%",
         render: (item) => <TextEllipsis className="name" data={item} length={50} />,
      },
      {
         title: t("Vị trí"),
         dataIndex: "jobLevel",
         key: "jobLevel",
         width: "8%",
      },
      {
         title: t("Số lượng"),
         dataIndex: "quantity",
         key: "quantity",
      },

      {
         title: t("Lương"),
         dataIndex: "salary",
         key: "salary",
         render: (item) => <span className="salary">{item}</span>,
      },

      {
         title: t("Ngày đăng"),
         dataIndex: "createdAt",
         key: "createdAt",
         sorter: true,

         render: (item) => <span>{moment(item).format("DD/MM/YYYY")}</span>,
      },
      {
         title: t("Ngày hết hạn"),
         dataIndex: "expiredAt",
         key: "expiredAt",
         sorter: true,

         render: (item) => <span>{item ? moment(item).format("DD/MM/YYYY") : "-"}</span>,
      },
      {
         title: t("Trạng thái"),
         dataIndex: "jobStatus",
         key: "jobStatus",
         render: (value) => <div className={`badge-status ${value ? value : ""}`}>{value}</div>,
      },

      {
         title: t("Action"),
         dataIndex: "id",
         align: "center",
         render: (_: string, record: any) => (
            <StyledFunctions>
               <BtnFunction
                  onClick={() => {
                     searchParams.set("id", record?.id);
                     setSearchParams(searchParams);
                     handleOpenDetailModal();
                  }}
               >
                  <EyeIcon />
               </BtnFunction>

               <BtnFunction
                  onClick={() => {
                     searchParams.set("id", record?.id);
                     setSearchParams(searchParams);
                     handleOpenEdit();
                  }}
               >
                  <EditIcon />
               </BtnFunction>

               <BtnFunction onClick={() => handleOpenDelete(record.id)}>
                  <DeleteIcon />
               </BtnFunction>
               {/* {moment(record?.expiredAt).isBefore(moment()) && (
                  <BtnFunction onClick={() => handleOpenRenewal(record)}>
                     <MdOutlineUpdate size={24} className="icon-renewal" />
                  </BtnFunction>
               )} */}
            </StyledFunctions>
         ),
      },
   ];

   const setValueToSearchParams = (name: string, value: string) => {
      if (value) {
         searchParams.set(name, value);
         setSearchParams(searchParams);
      } else {
         searchParams.delete(name);
         setSearchParams(searchParams);
      }
   };

   const handleOpenUpdate = (id: string) => {
      searchParams.set("id", id);
      setSearchParams(searchParams);
      handleOpen();
   };

   const handleOpenDelete = (id: string) => {
      setSelectedId(id);
      handleOpenDeleteModal();
   };

   const handleOpenRenewal = (record: any) => {
      searchParams.set("id", record?.id);
      setSearchParams(searchParams);
      setSelectedExpired(record?.expiredAt);
      handleOpenRenewalModal();
   };

   const handleOnChange = debounce(setValueToSearchParams, 500);

   const handleConfirmDelete = () => {
      deleteJob(selectedId)
         .unwrap()
         .then(() => {
            openNotification({
               type: "success",
               message: t("Delete job successfully!!!"),
            });
            handleCloseDelete();
         })
         .catch((error: any) => {
            openNotification({
               type: "error",
               message: t("Can't delete this job because it has any applied cv!!!"),
            });
            handleCloseDelete();
         });
   };

   useEffect(() => {
      const dataSource = (dataCompany?.listJob ?? [])?.map((item: IJob) => ({
         key: item.id,
         ...item,
         salary: item?.salaryInfo?.isSalaryNegotiable
            ? "Thỏa thuận"
            : `${convertPrice(item?.salaryInfo?.minSalary)} - ${convertPrice(
                 item?.salaryInfo?.maxSalary
              )} (${item?.salaryInfo?.salaryType})`,
      }));

      setDataSource(dataSource);
   }, [dataCompany]);

   return (
      <>
         <Header handleOpenCreate={handleOpen} title="Quản lý tin tuyển dụng" />
         <ContainerTable>
            <FilterJobs />

            <FormProvider {...form}>
               {/* <Input
                  icons={<SearchIcon />}
                  name="keyword"
                  onChange={(e) => {
                     form.setValue("keyword", e.target.value);
                     handleOnChange("keyword", e.target.value);
                  }}
                  placeholder="Search by job title"
               /> */}
            </FormProvider>
            <Table
               size="small"
               columns={columns}
               dataSource={dataSource}
               tableInstance={tableInstance}
               loading={isLoading || isFetching}
               totalElements={dataCompany?.totalElements || 0}
               totalPages={dataCompany?.totalPages || 0}
            />
         </ContainerTable>
         <StyledModal
            title={"Đăng tin tuyển dụng"}
            destroyOnClose
            open={isOpen}
            onCancel={() => {
               handleClose();
               searchParams.delete("id");
               setSearchParams(searchParams);
            }}
         >
            <CreateJob handleClose={handleClose} />
         </StyledModal>
         <StyledDetail
            width="1000px"
            title={
               <div className="job-detail-header">
                  <span>Tin tuyển dụng</span>
                  <Button
                     onClick={() => {
                        navigate(`${searchParams.get("id")}/cv-matched`);
                     }}
                  >
                     Danh sách ứng tuyển
                  </Button>
               </div>
            }
            visible={isOpenDetail}
            onCancel={() => {
               handleCloseDetail();
               searchParams.delete("id");
               setSearchParams(searchParams);
            }}
         >
            <JobPost
               handleClose={() => {
                  handleCloseDetail();
                  searchParams.delete("id");
                  setSearchParams(searchParams);
               }}
            />
         </StyledDetail>
         <Modal
            type="confirm"
            open={isOpenDelete}
            onCancel={() => {
               handleCloseDelete();
            }}
            confirmIcon="?"
            title={t("Do to want to delete this job?")}
         >
            <GroupButton>
               <Button
                  height={44}
                  style={{ padding: "0 24px" }}
                  key="back"
                  border="outline"
                  onClick={() => {
                     handleCloseDelete();
                  }}
               >
                  {t("common:confirm.cancel")}
               </Button>
               <Button
                  height={44}
                  key="submit"
                  onClick={handleConfirmDelete}
                  loading={loadingDeleteJob}
               >
                  {t(t("common:confirm.ok"))}
               </Button>
            </GroupButton>
         </Modal>

         <StyledModal
            title={"Tin tuyển dụng"}
            destroyOnClose
            open={isOpenEdit}
            onCancel={() => {
               handleCloseEdit();
               searchParams.delete("id");
               setSearchParams(searchParams);
            }}
         >
            <EditJob
               handleClose={() => {
                  handleCloseEdit();
                  searchParams.delete("id");
                  setSearchParams(searchParams);
               }}
            />
         </StyledModal>

         <Modal
            destroyOnClose
            visible={isOpenRenewal}
            title="Renewal job"
            onCancel={handleCloseRenewal}
         >
            <ModalRenewal handleClose={handleCloseRenewal} expiredAt={selectedExpired} />
         </Modal>
      </>
   );
};

export default Jobs;
