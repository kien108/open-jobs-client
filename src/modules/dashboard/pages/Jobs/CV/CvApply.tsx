import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
   Button,
   CloseIcon,
   DeleteIcon,
   DownloadIcon,
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
} from "../../../../../libs/components";

import { RootState, useCommonSelector, useModal } from "../../../../../libs/common";
import { FormProvider, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import {
   GroupButton,
   BtnFunction,
   ContainerTable,
   StyledFunctions,
   StyledHeader,
   Container,
} from "./styles";
import { Col, Row } from "antd";

import FileSaver from "file-saver";

import {
   useAcceptCVMutation,
   useExportCVsMutation,
   useGetCvAppliedQuery,
   useGetCvMatchedQuery,
   useLazyDownloadExportQuery,
   useRejectCVMutation,
} from "../../../services";
import { FilterCV } from "../../../components/FilterCV";
import { useFilterCV } from "../../../hooks";
import { EMemberTypes } from "../../../../../types";
import { MdUpgrade } from "react-icons/md";

const CVApply = () => {
   const { t } = useTranslation();
   const [selectedCV, setSelectedCV] = useState<any>(undefined);
   const [searchParams, setSearchParams] = useSearchParams();
   const [dataSource, setDataSource] = useState<any>([]);
   const { company } = useCommonSelector((state: RootState) => state.user.user);
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
         ...useFilterCV(),
      },
      {
         skip: !id,
         refetchOnMountOrArgChange: true,
      }
   );

   const [rejectCV, { isLoading: loadingReject }] = useRejectCVMutation();
   const [exportCVs, { isLoading: loadingExport, data: dataExport }] = useExportCVsMutation();
   const [download, { isLoading: loadingDownload }] = useLazyDownloadExportQuery();
   const Status = {
      ACCEPTED: "accept",
      REJECTED: "reject",
      NEW: "new",
   };

   const columns: ColumnsType<any> = [
      {
         title: t("Tiêu đề"),
         dataIndex: "title",
         key: "title",
         sorter: true,
         render: (item) => <span className="col title">{item || "-"}</span>,
      },
      {
         title: t("Chuyên ngành"),
         dataIndex: "major",
         key: "major",
         sorter: true,
         render: (item) => <span className="col">{item}</span>,
      },
      {
         title: "Chuyên ngành hẹp",
         dataIndex: "specialization",
         key: "specialization",
         sorter: true,
         render: (item) => <span className="col">{item}</span>,
      },
      {
         title: "Kỹ năng",
         dataIndex: "skill",
         key: "skill",
         sorter: true,
         render: (item) => <span className="col">{item || "-"}</span>,
      },

      {
         title: t("Status"),
         dataIndex: "status",
         key: "status",
         sorter: true,
         render: (value: string) => (
            <div className={`badge-status ${value ? value : ""}`}>{value}</div>
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

   const handleExport = () => {
      const appliedCVs = dataSource
         .filter((item: any) => item?.cvStatus === "ACCEPTED")
         .map((item: any) => ({
            firstName: item?.firstName,
            lastName: item?.lastName,
            email: item?.email,
            phone: item?.phone,
            gender: item?.gender,
            url: `http://localhost:5173/cv-review/${item?.userId}`,
         }));
      const body = {
         jobId: id,
         appliedCVs,
      };
      if (appliedCVs.length === 0) {
         openNotification({
            type: "error",
            message: "Không có bất kỳ hồ sơ được chấp thuận nào!",
         });
         return;
      }

      exportCVs(body)
         .unwrap()
         .then((data) => {
            download({ filename: data?.pathName })
               .unwrap()
               .then((res) => FileSaver.saveAs(res, "accepted-cvs.xlsx"))
               .catch((err) => {
                  openNotification({
                     type: "error",
                     message: t("common:ERRORS.SERVER_ERROR"),
                  });
               });
         })
         .catch((error) => {
            openNotification({
               type: "error",
               message: t("common:ERRORS.SERVER_ERROR"),
            });
         });
   };

   useEffect(() => {
      const dataSource = (dataCVs?.listCv ?? [])?.map((item: any) => ({
         ...item,
         key: item?.id,
         major: item?.major?.name,
         specialization: item?.specialization?.name,
         skill: item?.listSkill?.map((item) => item?.skill?.name)?.join(" - "),
      }));

      setDataSource(dataSource || []);
   }, [dataCVs]);

   return (
      <Container>
         <StyledHeader>
            <Title>Quản lý hồ sơ</Title>
            <Button
               className="btn-close"
               onClick={() => {
                  navigate("/dashboard/jobs");
               }}
            >
               <CloseIcon />
            </Button>
         </StyledHeader>

         <Button
            className="btn-export"
            disabled={dataSource.length === 0}
            loading={loadingExport}
            height={44}
            icon={<DownloadIcon />}
            onClick={handleExport}
         >
            {t("Xuất danh sách hồ sơ")}
         </Button>
         {company?.memberType === EMemberTypes.DEFAULT ? (
            <div className="pay">
               <span>
                  Nâng cấp tài khoản lên{" "}
                  <span className="premium" onClick={() => navigate("/dashboard/premium")}>
                     Premium
                  </span>{" "}
                  để sử dụng tính năng này
               </span>

               <Button className="btn-upgrade" onClick={() => navigate("/dashboard/premium")}>
                  Nâng cấp ngay
                  <MdUpgrade color="white" size={28} />
               </Button>
            </div>
         ) : (
            <ContainerTable>
               <FilterCV />

               <Table
                  columns={columns}
                  dataSource={dataSource}
                  tableInstance={tableInstance}
                  loading={loadingCVs || fetchingCVs}
                  totalElements={dataCVs?.totalElements || 0}
                  totalPages={dataCVs?.totalPages || 0}
                  locale={{ emptyText: "Không có hồ sơ" }}
               />
            </ContainerTable>
         )}

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
      </Container>
   );
};

export default CVApply;
