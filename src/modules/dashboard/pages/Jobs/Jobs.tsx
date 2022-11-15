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
   Table,
   Title,
} from "../../../../libs/components";

import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { BtnFunction, ContainerTable, StyledFunctions, StyledModal } from "./styles";
// import { useDeActivateMutation, useGetCompaniesQuery } from "../services";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { ICompany } from "../types";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { debounce } from "lodash";
import { GroupButton } from "../../components/modal/styles";
import { MdOutlinePassword } from "react-icons/md";
import { CreateJob } from "../../components/modal";
import {
   useGetJobsQuery,
   useGetMajorsQuery,
   useGetSkillsQuery,
   useGetSpecializationsQuery,
} from "../../services";
import { useDeleteJobMutation, useGetJobCompanyQuery } from "../../services/JobAPI";

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

   const navigate = useNavigate();

   const { user } = useCommonSelector((state: RootState) => state.user);
   const { isOpen, handleOpen, handleClose } = useModal();

   const [searchParams, setSearchParams] = useSearchParams();

   const {
      data: dataCompany,
      isLoading,
      isFetching,
   } = useGetJobCompanyQuery(user?.companyId, {
      refetchOnMountOrArgChange: true,
      skip: !user?.companyId,
   });

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
      isOpen: isOpenDelete,
      handleClose: handleCloseDelete,
      handleOpen: handleOpenDeleteModal,
   } = useModal();

   const [deleteJob, { isLoading: loadingDeleteJob }] = useDeleteJobMutation();

   const columns: ColumnsType<any> = [
      {
         title: t("Title"),
         dataIndex: "title",
         key: "title",
         sorter: true,
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
         render: (item) => <span>{moment(item).format("MM/DD/YYYY")}</span>,
      },

      {
         title: t("Action"),
         dataIndex: "id",
         render: (_: string, record: any) => (
            <StyledFunctions>
               <BtnFunction onClick={() => navigate(`${record?.id}/cv-matched`)}>
                  <EyeIcon />
               </BtnFunction>
               <BtnFunction onClick={() => handleOpenDelete(record.id)}>
                  <DeleteIcon />
               </BtnFunction>
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
         .catch((error) => {
            openNotification({
               type: "error",
               message: t("common:ERRORS.SERVER_ERROR"),
            });
         });
   };

   useEffect(() => {
      console.log(dataCompany);
      const dataSource = dataCompany?.map((item: any) => ({
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
               <Input
                  icons={<SearchIcon />}
                  name="keyword"
                  onChange={(e) => {
                     form.setValue("keyword", e.target.value);
                     handleOnChange("keyword", e.target.value);
                  }}
                  placeholder="Search by job title"
               />
            </FormProvider>
            <Table
               columns={columns}
               dataSource={dataSource}
               tableInstance={tableInstance}
               loading={isLoading || isFetching}
               totalElements={0}
               totalPages={0}
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
      </>
   );
};

export default Jobs;
