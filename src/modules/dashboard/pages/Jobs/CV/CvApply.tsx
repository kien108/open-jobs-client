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

import { useModal } from "../../../../../libs/common";
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

import {
   useExportCVsMutation,
   useGetCvMatchedQuery,
   useLazyDownloadExportQuery,
   useRejectCVMutation,
} from "../../../services";
import FileSaver from "file-saver";
const CVMatched = () => {
   const { t } = useTranslation();
   const [selectedSkill, setSelectedSkill] = useState<any>(undefined);
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

   const [rejectCV, { isLoading: loadingReject }] = useRejectCVMutation();
   const [exportCVs, { isLoading: loadingExport }] = useExportCVsMutation();
   const [download, { isLoading: loadingDownload }] = useLazyDownloadExportQuery();

   const columns: ColumnsType<any> = [
      {
         title: t("First Name"),
         dataIndex: "firstName",
         key: "firstName",
         sorter: true,
         render: (item) => <span className="col">{item || "-"}</span>,
      },
      {
         title: t("Last Name"),
         dataIndex: "lastName",
         key: "lastName",
         sorter: true,
         render: (item) => <span className="col">{item}</span>,
      },
      {
         title: t("Email"),
         dataIndex: "email",
         key: "email",
         sorter: true,
         render: (item) => <span className="col">{item}</span>,
      },
      {
         title: t("Phone"),
         dataIndex: "phone",
         key: "phone",
         sorter: true,
         render: (item) => <span className="col">{item}</span>,
      },
      {
         title: t("Gender"),
         dataIndex: "gender",
         key: "gender",
         sorter: true,
         render: (item) => <span className="col">{item}</span>,
      },
      {
         title: t("Matched Skills"),
         dataIndex: "point",
         key: "point",
         sorter: true,
         render: (item) => <span className="match-cv">{item}</span>,
      },
      {
         title: t("Status"),
         dataIndex: "cvStatus",
         key: "cvStatus",
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
                           status: record?.cvStatus,
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

   const handleOpenUpdate = (skill: any) => {
      setSelectedSkill(skill);
      handleOpen();
   };

   // const handleOpenDelete = (cv: any) => {
   //    setSelectedCV(cv);
   //    handleOpenDeleteModal();
   // };
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

   // const handleConfirmDelete = () => {
   //    selectedCV &&
   //       rejectCV({ jobId: id, cvId: selectedCV?.cvId })
   //          .unwrap()
   //          .then(() => {
   //             openNotification({
   //                type: "success",
   //                message: t("Delete CV successful!!!"),
   //             });
   //             setSelectedCV(undefined);
   //             handleCloseDelete();
   //          })
   //          .catch((error) => {
   //             openNotification({
   //                type: "error",
   //                message: t("common:ERRORS.SERVER_ERROR"),
   //             });
   //          });
   // };

   const handleExport = () => {
      const matchedCVs = dataSource
         .filter((item: any) => item?.cvStatus === "ACCEPTED")
         .map((item: any) => ({
            firstName: item?.firstName,
            lastName: item?.lastName,
            email: item?.email,
            phone: item?.phone,
            gender: item?.gender,
            url: `http://localhost:5173/cv-review/${item?.userId}`,
         }));

      if (matchedCVs.length === 0) {
         openNotification({
            type: "error",
            message: "Don't have any accepted cvs to export!",
         });
         return;
      }

      const body = {
         jobId: id,
         matchedCVs,
      };
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
      const dataSource = dataCVs?.map((item: any) => ({
         ...item,
         key: item?.cv?.id,
      }));

      setDataSource(dataSource || []);
   }, [dataCVs]);

   return (
      <Container>
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

         <div className="items">
            <div className="item total">
               <span>Matched CV</span>
               <span className="value">{dataSource.length}</span>
            </div>
            <div className="item new">
               <span>New CV</span>
               <span className="value">
                  {dataSource?.filter((item: any) => item?.status === "NEW").length}
               </span>
            </div>

            <div className="item accepted">
               <span>Accepted CV</span>
               <span className="value">
                  {dataSource?.filter((item: any) => item?.status === "ACCEPTED").length}
               </span>
            </div>
            <div className="item rejected">
               <span>Rejected CV</span>
               <span className="value">
                  {dataSource?.filter((item: any) => item?.status === "REJECTED").length}
               </span>
            </div>
         </div>
         <ContainerTable>
            <Button
               className="btn-export"
               disabled={dataSource.length === 0}
               loading={loadingExport}
               height={44}
               icon={<DownloadIcon />}
               onClick={handleExport}
            >
               {t("Export Accepted CVs")}
            </Button>
            <Table
               columns={columns}
               dataSource={dataSource}
               tableInstance={tableInstance}
               loading={loadingCVs || fetchingCVs}
               totalElements={0}
               totalPages={0}
               locale={{ emptyText: "No CV Matched" }}
            />
         </ContainerTable>
      </Container>
   );
};

export default CVMatched;
