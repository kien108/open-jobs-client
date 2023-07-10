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
} from "../../../../libs/components";

import { useModal } from "../../../../libs/common";
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
import { Col, Row, Skeleton } from "antd";

import FileSaver from "file-saver";

import {
   useAcceptCVMutation,
   useExportCVsMutation,
   useGetCvAppliedQuery,
   useGetCvMatchedQuery,
   useGetJobByIdQuery,
   useLazyDownloadExportQuery,
   useRejectCVMutation,
} from "../../services";
import { FilterCV } from "../../components/FilterCV";
import { useFilterCV } from "../../hooks";

import { convertPrice } from "../../../dashboard/utils";

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
         ...useFilterCV(),
      },
      {
         skip: !id,
         refetchOnMountOrArgChange: true,
      }
   );

   const { data: dataJob, isFetching: fetchingJob } = useGetJobByIdQuery(id!, {
      skip: !id,
      refetchOnMountOrArgChange: true,
   });

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
         title: "Chuyên môn",
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
         title: "Trạng thái",
         dataIndex: "status",
         key: "status",
         sorter: true,
         render: (value: string) => (
            <div className={`badge-status ${value ? value : ""}`}>{value}</div>
         ),
      },
      {
         title: "Chức năng",
         dataIndex: "id",
         render: (_: string, record: any) => (
            <StyledFunctions>
               <BtnFunction
                  onClick={() => {
                     navigate({
                        pathname: `${record?.id}`,
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
                  message: "Xóa hồ sơ thành công!",
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
      const appliedCVs = (dataSource ?? [])
         ?.filter((item: any) => item?.status === "ACCEPTED")
         ?.map((item: any) => ({
            firstName: item?.firstName,
            lastName: item?.lastName,
            email: item?.email,
            phone: item?.phone,
            gender: item?.gender,
            url: `http://localhost:5173/cv-review/${item?.id}`,
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
      const dataSource = (dataCVs?.content ?? [])?.map((item: any) => ({
         ...item?.user,
         key: item?.user?.cv?.id,
         id: item?.user?.cv?.id,
         major: item?.user?.cv?.major?.name,
         specialization: item?.user?.cv?.specialization?.name,
         skill: item?.user?.cv?.skills?.map((item) => item?.skill?.name)?.join(" - "),
         title: item?.user?.cv?.title,
         status: item?.cvStatus,
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

         <div className="flex">
            {fetchingJob ? (
               <Skeleton active />
            ) : (
               <div className="job">
                  <span className="job-title">{dataJob?.title}</span>
                  <div className="item">
                     <span className="label">Vị trí:</span>
                     <span className="value">{dataJob?.jobLevel}</span>
                  </div>
                  <div className="item">
                     <span className="label">Kỹ năng:</span>
                     <span className="value">
                        {dataJob?.jobSkills?.map((item) => item?.skill?.name).join(" - ")}
                     </span>
                  </div>
                  <div className="item">
                     <span className="label">Lương:</span>
                     <span className="value">
                        {dataJob?.salaryInfo?.isSalaryNegotiable
                           ? "Mức lương thỏa thuận"
                           : `${convertPrice(dataJob?.salaryInfo?.minSalary)} - ${convertPrice(
                                dataJob?.salaryInfo?.maxSalary
                             )} (${dataJob?.salaryInfo?.salaryType})`}
                     </span>
                  </div>
               </div>
            )}

            <Button
               className="btn-export"
               disabled={dataSource.length === 0}
               loading={loadingExport}
               height={44}
               icon={<DownloadIcon />}
               onClick={handleExport}
            >
               {loadingExport ? "Đang xuất..." : "Xuất danh sách hồ sơ"}
            </Button>
         </div>
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

         <Modal
            type="confirm"
            open={isOpenDelete}
            onCancel={() => {
               handleCloseDelete();
            }}
            confirmIcon="?"
            title="Bạn có chắn chắn muốn xóa hồ sơ này không?"
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
                  Hủy
               </Button>
               <Button
                  height={44}
                  key="submit"
                  loading={loadingReject}
                  onClick={handleConfirmDelete}
               >
                  Lưu
               </Button>
            </GroupButton>
         </Modal>
      </Container>
   );
};

export default CVApply;
