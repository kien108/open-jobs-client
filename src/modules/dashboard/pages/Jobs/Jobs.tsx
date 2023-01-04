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
import { CreateJob, JobPost } from "../../components/modal";
import {
   useGetJobsQuery,
   useGetMajorsQuery,
   useGetSkillsQuery,
   useGetSpecializationsQuery,
} from "../../services";
import { useDeleteJobMutation, useGetJobCompanyQuery } from "../../services/JobAPIDashBoard";
import ModalRenewal from "../../components/modal/ModalRenewal";

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
      { id: user?.companyId, ...tableInstance.params },
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
         title: t("Title"),
         dataIndex: "title",
         key: "title",
         sorter: true,
         width: "20%",
      },
      {
         title: t("WorkPlace"),
         dataIndex: "workPlace",
         key: "workPlace",
         sorter: true,
      },
      {
         title: t("Salary"),
         dataIndex: "salary",
         key: "salary",
         sorter: true,
      },
      {
         title: t("Quantity"),
         dataIndex: "quantity",
         key: "quantity",
         sorter: true,
      },
      {
         title: t("Created At"),
         dataIndex: "createdAt",
         key: "createdAt",
         sorter: true,
         render: (item) => <span>{moment(item).format("DD/MM/YYYY")}</span>,
      },
      {
         title: t("Expired At"),
         dataIndex: "expiredAt",
         key: "expiredAt",
         sorter: true,
         render: (item) => <span>{item ? moment(item).format("DD/MM/YYYY") : "N/A"}</span>,
      },
      {
         title: t("Expired At"),
         dataIndex: "expiredAt",
         key: "expiredAt",
         sorter: true,
         width: "10%",

         render: (item) => (
            <span>
               {item ? (
                  <Status
                     isActive={moment(item).isAfter(moment())}
                     activeMsg="In-progress"
                     inactiveMsg="Expired"
                  />
               ) : (
                  <Status isActive={true} activeMsg="In-progress" inactiveMsg="Expired" />
               )}
            </span>
         ),
      },

      {
         title: t("Action"),
         dataIndex: "id",
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
               <BtnFunction onClick={() => handleOpenDelete(record.id)}>
                  <DeleteIcon />
               </BtnFunction>
               {moment(record?.expiredAt).isBefore(moment()) && (
                  <BtnFunction onClick={() => handleOpenRenewal(record)}>
                     <MdOutlineUpdate size={24} className="icon-renewal" />
                  </BtnFunction>
               )}
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
      const dataSource = dataCompany?.listJob?.map((item: any) => ({
         key: item.id,
         ...item,
      }));

      setDataSource(dataSource || []);
   }, [dataCompany]);

   return (
      <>
         <Header handleOpenCreate={handleOpen} title="Jobs Management" />
         <ContainerTable>
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
               columns={columns}
               dataSource={dataSource}
               tableInstance={tableInstance}
               loading={isLoading || isFetching}
               totalElements={dataCompany?.totalElements}
               totalPages={dataCompany?.totalPages}
            />
         </ContainerTable>
         <StyledModal
            title={"Create new job"}
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
            title={
               <div className="job-detail-header">
                  <span>Job Detail</span>
                  <Button
                     onClick={() => {
                        navigate(`${searchParams.get("id")}/cv-matched`);
                     }}
                  >
                     View list CV
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
