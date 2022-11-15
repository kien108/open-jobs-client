import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
   Button,
   CloseIcon,
   DeleteIcon,
   EditIcon,
   Input,
   Modal,
   openNotification,
   OptionType,
   PlusIcon,
   SearchIcon,
   Select,
   Switch,
   Table,
   Title,
} from "../../../../../libs/components";

import { useModal } from "../../../../../libs/common";
import { FormProvider, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { GroupButton, BtnFunction, ContainerTable, StyledFunctions, StyledHeader } from "./styles";
import { Col, Row } from "antd";

import { useGetCvMatchedQuery } from "../../../services";
const CVMatched = () => {
   const { t } = useTranslation();
   const [selectedSkill, setSelectedSkill] = useState<any>(undefined);
   const [searchParams, setSearchParams] = useSearchParams();
   const [dataSource, setDataSource] = useState<any>([]);
   const navigate = useNavigate();

   const [options, setOptions] = useState<OptionType[]>([]);
   const { id } = useParams();

   const tableInstance = Table.useTable();

   const { isOpen, handleOpen, handleClose } = useModal();

   const form = useForm({
      defaultValues: {
         keyword: searchParams.get("keyword"),
         majorId: searchParams.get("majorId"),
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

   const {
      data: dataCVs,
      isLoading: loadingCVs,
      isFetching: fetchingCVs,
   } = useGetCvMatchedQuery(
      {
         id,
         ...tableInstance.params,
      },
      {
         skip: !id,
         refetchOnMountOrArgChange: true,
      }
   );

   // const [deleteSpecialization, { isLoading: loadingDeleteSpecialization }] =
   //    useDeleteSkillMutation();

   const columns: ColumnsType<any> = [
      {
         title: t("First Name"),
         dataIndex: "firstName",
         key: "firstName",
         sorter: true,
      },
      {
         title: t("Last Name"),
         dataIndex: "lastName",
         key: "lastName",
         sorter: true,
      },
      {
         title: t("Email"),
         dataIndex: "email",
         key: "email",
         sorter: true,
      },
      {
         title: t("Phone"),
         dataIndex: "phone",
         key: "phone",
         sorter: true,
      },
      {
         title: t("Gender"),
         dataIndex: "gender",
         key: "gender",
         sorter: true,
      },
      {
         title: t("Actions"),
         dataIndex: "id",
         render: (_: string, item: any) => (
            <StyledFunctions>
               <BtnFunction onClick={() => handleOpenUpdate(item)}>
                  <EditIcon />
               </BtnFunction>
               <BtnFunction onClick={() => handleOpenDelete(item)}>
                  <DeleteIcon />
               </BtnFunction>
            </StyledFunctions>
         ),
      },
   ];

   const handleOpenUpdate = (skill: any) => {
      setSelectedSkill(skill);
      handleOpen();
   };

   const handleOpenDelete = (skill: any) => {
      setSelectedSkill(skill);

      handleOpenDeleteModal();
   };
   const setValueToSearchParams = (name: string, value: string) => {
      if (value) {
         searchParams.set(name, value);
         setSearchParams(searchParams);
      } else {
         searchParams.delete(name);
         setSearchParams(searchParams);
      }
   };
   const handleOnChange = debounce(setValueToSearchParams, 500);

   // const handleConfirmDelete = () => {
   //    selectedSkill &&
   //       deleteSpecialization(selectedSkill.id)
   //          .unwrap()
   //          .then(() => {
   //             openNotification({
   //                type: "success",
   //                message: t("Delete this Specialization successfully!!!"),
   //             });
   //             setSelectedSkill(undefined);
   //             handleCloseDelete();
   //          })
   //          .catch((error) => {
   //             openNotification({
   //                type: "error",
   //                message: t("common:ERRORS.SERVER_ERROR"),
   //             });
   //          });
   // };

   useEffect(() => {
      const dataSource = dataCVs?.map((item: any) => ({
         ...item,
         key: item?.cv?.id,
      }));

      setDataSource(dataSource || []);
   }, [dataCVs]);

   return (
      <>
         <StyledHeader>
            <Title>Matched CV Management</Title>
            <Button
               className="btn-close"
               onClick={() => {
                  navigate("/dashboard/jobs");
               }}
            >
               <CloseIcon />
            </Button>
         </StyledHeader>

         <ContainerTable>
            <Table
               columns={columns}
               dataSource={dataSource}
               tableInstance={tableInstance}
               loading={false}
               totalElements={0}
               totalPages={0}
            />
         </ContainerTable>

         <Modal
            type="confirm"
            open={isOpenDelete}
            onCancel={() => {
               searchParams.delete("id");
               setSearchParams(searchParams);
               handleCloseDelete();
            }}
            confirmIcon="?"
            title={t("Do to want to delete this skill?")}
         >
            <GroupButton>
               <Button
                  height={44}
                  style={{ padding: "0 24px" }}
                  key="back"
                  border="outline"
                  onClick={() => {
                     setSelectedSkill(undefined);
                     handleCloseDelete();
                  }}
               >
                  {t("common:confirm.cancel")}
               </Button>
               <Button height={44} key="submit" loading={false}>
                  {t(t("common:confirm.ok"))}
               </Button>
            </GroupButton>
         </Modal>
      </>
   );
};

export default CVMatched;
