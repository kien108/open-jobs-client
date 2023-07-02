import React, { FC, ReactNode, useEffect, useRef, useState } from "react";

import {
   Button,
   DeleteIcon,
   Input,
   MinimizeIcon,
   Modal,
   openNotification,
   OptionType,
   PlusIcon,
   Select,
   Switch,
   Table,
} from "../../../../libs/components";

import {
   BtnFunction,
   GroupButton,
   StyledCreateAndEditHr,
   StyledExtendOption,
   StyledListUnits,
   StyledNotFound,
} from "./styles";

import yup from "../../utils/yupGlobal";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormProvider, useForm, useFieldArray } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { Col, Divider, Row, Spin } from "antd";

import {
   RootState,
   useCommonSelector,
   useDebounce,
   useGetAdminByIdQuery,
   useModal,
} from "../../../../libs/common";
import { useNavigate, useSearchParams } from "react-router-dom";

import { EmailVariables } from "../EmailVariables";
import { useGetJobByIdQuery } from "../../services";
import { ColumnsType } from "antd/es/table";
import Parser from "html-react-parser";
import { convertPrice } from "../../utils";

interface ICreateAndEditAdmin {
   handleClose: () => void;
}

type FormType = {
   title: string;
   skills: any;
   specialization: string;
   quantity: string;
   workPlace: string;
   salary: string;
   majorId: string;
   specializationId: string;
   hoursPerWeek: number;
};

const CreateJob: FC<ICreateAndEditAdmin> = ({ handleClose }) => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();
   const tableInstance = Table.useTable();
   const { user } = useCommonSelector((state: RootState) => state.user);
   const [dataSources, setDataSources] = useState<any>([]);

   const contentRef = useRef<any>(null);

   const {
      data: dataJob,
      isLoading: loadingJob,
      isFetching: fetchingJob,
   } = useGetJobByIdQuery(searchParams.get("id")!, {
      skip: !searchParams.get("id"),
      refetchOnMountOrArgChange: true,
   });

   const columns: ColumnsType<any> = [
      {
         title: "Tên",
         dataIndex: "name",
         key: "name",
         width: "23%",
         render: (value) => (
            <span className="value primary" style={{ fontSize: "16px" }}>
               {value || "-"}
            </span>
         ),
      },
      {
         title: "Năm kinh nghiệm",
         dataIndex: "yoe",
         key: "yoe",
         width: "20%",
         render: (value) => <>{value}</>,
      },
      {
         title: "Độ ưu tiên / 100%",
         dataIndex: "weight",
         key: "weight",
         width: "30%",
         render: (value, record) => value,
      },
      {
         title: "Bắt buộc",
         dataIndex: "required",
         key: "required",
         width: "13%",
         render: (value, record) => (value ? "Có" : "Không"),
      },
   ];

   useEffect(() => {
      const data = (dataJob?.jobSkills ?? [])?.map((item) => ({
         key: item?.id,
         name: item?.skill?.name,
         required: item?.required,
         weight: item?.weight,
         yoe: item?.yoe,
      }));

      setDataSources(data);
   }, [dataJob]);

   return (
      <Spin spinning={loadingJob || fetchingJob}>
         <StyledCreateAndEditHr>
            <Row gutter={[10, 30]}>
               <Col span={24}>
                  <div className="title-container">
                     <span className="label">Tiêu đề:</span>
                     <span className="value primary">{dataJob?.title}</span>
                  </div>
               </Col>
               <Col span={24}>
                  <div className="listSkill">
                     <Row gutter={[10, 10]}>
                        <Col span={12}>
                           <div className="title-container">
                              <span className="label">Chuyên ngành:</span>
                              <span className="value">{dataJob?.major?.name}</span>
                           </div>
                        </Col>
                        <Col span={12}>
                           <div className="title-container">
                              <span className="label">Chuyên môn:</span>
                              <span className="value">{dataJob?.specialization?.name}</span>
                           </div>
                        </Col>
                     </Row>

                     <span className="label" style={{ display: "block", marginTop: "20px" }}>
                        Kỹ năng
                     </span>
                     <Col span={24}>
                        <Table
                           dataSource={dataSources}
                           tableInstance={tableInstance}
                           columns={columns}
                           totalPages={0}
                           totalElements={0}
                           showPagination={false}
                           loading={false}
                        />
                     </Col>
                  </div>
               </Col>

               <Col span={12}>
                  <div className="title-container">
                     <span className="label">Vị trí:</span>
                     <span className="value primary">{dataJob?.jobLevel}</span>
                  </div>
               </Col>
               <Col span={12}>
                  <div className="title-container">
                     <span className="label">Loại công việc:</span>
                     <span className="value">{dataJob?.jobType}</span>
                  </div>
               </Col>
               <Col span={12}>
                  <div className="title-container">
                     <span className="label">Số lượng:</span>
                     <span className="value">{dataJob?.quantity}</span>
                  </div>
               </Col>
               <Col span={12}>
                  <div className="title-container">
                     <span className="label">Nơi làm việc:</span>
                     <span className="value">{dataJob?.workPlace}</span>
                  </div>
               </Col>
               <Col span={12}>
                  <div className="title-container">
                     <span className="label">Lương:</span>
                     <span className="value primary">
                        {dataJob?.salaryInfo?.isSalaryNegotiable
                           ? "Thỏa thuận"
                           : `${convertPrice(
                                dataJob?.salaryInfo?.minSalary || "0"
                             )} - ${convertPrice(dataJob?.salaryInfo?.maxSalary || "0")} (${
                                dataJob?.salaryInfo?.salaryType
                             })`}
                     </span>
                  </div>
               </Col>
               <Col span={12}>
                  <div className="title-container">
                     <span className="label">Thời gian làm việc / tuần:</span>
                     <span className="value"> {dataJob?.hoursPerWeek}</span>
                  </div>
               </Col>
               <Col span={24}>
                  <span className="label">Mô tả công việc</span>
                  <p className="value">
                     {dataJob?.description ? Parser(`${dataJob?.description}`) : "-"}
                  </p>
               </Col>
            </Row>

            {/* <span
               className="go-to-cvs"
               onClick={() => {
                  navigate(`${searchParams.get("id")}/cv-matched`);
               }}
            >
               View list CV
            </span> */}

            <GroupButton>
               <Button
                  onClick={() => {
                     handleClose();
                     searchParams.delete("id");
                     setSearchParams(searchParams);
                  }}
               >
                  Đóng
               </Button>
            </GroupButton>
         </StyledCreateAndEditHr>
      </Spin>
   );
};

export default CreateJob;
