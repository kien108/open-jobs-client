import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
   Button,
   CloseIcon,
   DeleteIcon,
   EditIcon,
   EyeIcon,
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
} from "../../../../libs/components";

import { useModal } from "../../../../libs/common";
import { FormProvider, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { GroupButton, BtnFunction, ContainerTable, StyledFunctions, StyledHeader } from "./styles";
import { Col, Row } from "antd";

import {
   useAcceptCVMutation,
   useGetCvAppliedQuery,
   useGetCvMatchedQuery,
   useRejectCVMutation,
} from "../../services";
const CVApply = () => {
   const { t } = useTranslation();
   const [selectedCV, setSelectedCV] = useState<any>(undefined);
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
   } = useGetCvAppliedQuery(
      {
         id,
         ...tableInstance.params,
      },
      {
         skip: !id,
         refetchOnMountOrArgChange: true,
      }
   );

   const [rejectCV, { isLoading: loadingReject }] = useRejectCVMutation();

   const Status = {
      ACCEPTED: "accept",
      REJECTED: "reject",
      NEW: "new",
   };
   const columns: ColumnsType<any> = [
      {
         title: t("Title"),
         dataIndex: "title",
         key: "title",
         sorter: true,
         render: (item) => <span className="col">{item || "-"}</span>,
      },
      {
         title: t("Major"),
         dataIndex: "major",
         key: "major",
         sorter: true,
         render: (item) => <span className="col">{item || "-"}</span>,
      },
      {
         title: t("Specialization"),
         dataIndex: "specialization",
         key: "specialization",
         sorter: true,
         render: (item) => <span className="col">{item || "-"}</span>,
      },
      {
         title: t("Skills"),
         dataIndex: "skills",
         key: "skills",
         sorter: true,
         render: (_: string, record: any) => (
            <span className="col">
               {record?.listSkill?.map((item: any) => item?.name).join(" - ")}
            </span>
         ),
      },
      {
         title: t("Status"),
         dataIndex: "status",
         key: "skills",
         sorter: true,
         render: (value: string) => (
            <span className={`status ${value ?? "NEW"}`}>{value ?? "NEW"}</span>
         ),
      },
      {
         title: t("Actions"),
         dataIndex: "id",
         render: (_: string, record: any) => (
            <StyledFunctions>
               <BtnFunction
                  onClick={() => {
                     navigate({
                        pathname: `${record?.userId}`,
                        search: createSearchParams({
                           status: record?.status,
                        }).toString(),
                     });
                  }}
               >
                  <EyeIcon />
               </BtnFunction>
               <BtnFunction onClick={() => handleOpenDelete(record)}>
                  <DeleteIcon />
               </BtnFunction>
            </StyledFunctions>
         ),
      },
   ];

   const handleOpenDelete = (cv: any) => {
      setSelectedCV(cv);
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

   const handleConfirmDelete = () => {
      selectedCV &&
         rejectCV({ jobId: id, cvId: selectedCV.id })
            .unwrap()
            .then(() => {
               openNotification({
                  type: "success",
                  message: t("Delete CV successful!!!"),
               });
               setSelectedCV(undefined);
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
      const dataSource = dataCVs?.listCv?.map((item: any) => ({
         ...item,
         key: item?.id,
         major: item?.major?.name,
         specialization: item?.specialization?.name,
      }));

      setDataSource(dataSource || []);
   }, [dataCVs]);

   return (
      <>
         <StyledHeader>
            <Title>Applied CV Management</Title>
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
               loading={loadingCVs || fetchingCVs}
               totalElements={dataCVs?.totalElements || 0}
               totalPages={dataCVs?.totalPages || 0}
            />
         </ContainerTable>

         <Modal
            type="confirm"
            open={isOpenDelete}
            onCancel={() => {
               handleCloseDelete();
            }}
            confirmIcon="?"
            title={t("Do to want to delete this CV?")}
         >
            <GroupButton>
               <Button
                  height={44}
                  style={{ padding: "0 24px" }}
                  key="back"
                  border="outline"
                  onClick={() => {
                     setSelectedCV(undefined);
                     handleCloseDelete();
                  }}
               >
                  {t("common:confirm.cancel")}
               </Button>
               <Button
                  height={44}
                  key="submit"
                  loading={loadingReject}
                  onClick={handleConfirmDelete}
               >
                  {t(t("common:confirm.ok"))}
               </Button>
            </GroupButton>
         </Modal>
      </>
   );
};

export default CVApply;
