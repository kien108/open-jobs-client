import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";

import { useModal } from "../../../../libs/common";
import {
   Button,
   DeleteIcon,
   EditIcon,
   EyeIcon,
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
import { useSearchParams } from "react-router-dom";
// import { ICompany } from "../types";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { debounce } from "lodash";
import { GroupButton } from "../../components/modal/styles";
import { MdOutlinePassword } from "react-icons/md";
import { CreateJob } from "../../components/modal";

const Jobs = () => {
   const { t } = useTranslation();
   const tableInstance = Table.useTable();
   const [dataSource, setDataSource] = useState<any>([]);
   const [selectedId, setSelectedId] = useState<string | undefined>("");

   const { isOpen, handleOpen, handleClose } = useModal();

   const [searchParams, setSearchParams] = useSearchParams();

   const {
      isOpen: isOpenDelete,
      handleClose: handleCloseDelete,
      handleOpen: handleOpenDeleteModal,
   } = useModal();

   const {
      isOpen: isOpenEditPassword,
      handleClose: handleCloseEditPassword,
      handleOpen: handleOpenEditPassword,
   } = useModal();

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

   // const {
   //    data: dataCompanies,
   //    isLoading: loadingCompanies,
   //    isFetching: fetchingCompanies,
   // } = useGetCompaniesQuery(
   //    {
   //       ...tableInstance.params,
   //       ...useFilter(),
   //    },
   //    {
   //       refetchOnMountOrArgChange: true,
   //    }
   // );

   // const [deleteCompany, { isLoading: loadingDeleteCompany }] = useDeActivateMutation();

   const handleEditPassword = (id: string) => {
      setSelectedId(id);
      handleOpenEditPassword();
   };

   const columns: ColumnsType<any> = [
      {
         title: t("Name"),
         dataIndex: "name",
         key: "name",
         sorter: true,
      },
      {
         title: t("Address"),
         dataIndex: "address",
         key: "address",
         sorter: true,
         render: (item) => (item ? item : "N/A"),
      },
      {
         title: t("Account Balance"),
         dataIndex: "accountBalance",
         key: "accountBalance",
         sorter: true,
      },
      {
         title: t("Contract End Date"),
         dataIndex: "contractEndDate",
         key: "contractEndDate",
         sorter: true,
      },
      {
         title: t("Description"),
         dataIndex: "description",
         key: "description",
         sorter: true,
      },
      {
         title: t("Phone number"),
         dataIndex: "phone",
         key: "phone",
         sorter: true,
         render: (item) => (item ? item : "N/A"),
      },
      {
         title: t("Employees"),
         dataIndex: "totalEmployee",
         key: "totalEmployee",
         sorter: true,
         render: (item) => (item ? item : "N/A"),
      },

      {
         title: t("adminManagement.actions"),
         dataIndex: "id",
         render: (_: string, record: any) => (
            <StyledFunctions>
               <BtnFunction onClick={() => handleOpenUpdate(record.id)}>
                  <EditIcon />
               </BtnFunction>
               <BtnFunction onClick={() => handleOpenDelete(record.id)}>
                  <DeleteIcon />
               </BtnFunction>
               <BtnFunction onClick={() => handleEditPassword(record.id)}>
                  <MdOutlinePassword size={25} className="icon-password" />
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

   // const handleConfirmDelete = () => {
   //    selectedId &&
   //       deleteCompany(selectedId)
   //          .unwrap()
   //          .then(() => {
   //             openNotification({
   //                type: "success",
   //                message: t("Deactivate this account successfully!!!"),
   //             });
   //             searchParams.delete("id");
   //             setSearchParams(searchParams);
   //             handleCloseDelete();
   //          })
   //          .catch((error) => {
   //             openNotification({
   //                type: "error",
   //                message: t("common:ERRORS.SERVER_ERROR"),
   //             });
   //          });
   // };

   // useEffect(() => {
   //    dataCompanies &&
   //       setDataSource(
   //          dataCompanies.companies.map((item) => ({
   //             key: item.id,
   //             ...item,
   //          }))
   //       );
   // }, [dataCompanies]);

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
               loading={false}
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
               searchParams.delete("id");
               setSearchParams(searchParams);
               handleCloseDelete();
            }}
            confirmIcon="?"
            title={t("Do to want to delete this company?")}
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
                  {t("common:confirm.cancel")}
               </Button>
               <Button height={44} key="submit">
                  {t(t("common:confirm.ok"))}
               </Button>
            </GroupButton>
         </Modal>
      </>
   );
};

export default Jobs;
