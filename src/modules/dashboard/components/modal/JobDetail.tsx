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
         title: t("Name"),
         dataIndex: "name",
         key: "name",
         width: "45%",
         render: (item) => item,
      },
      {
         title: t("EXP"),
         dataIndex: "experience",
         key: "experience",
         width: "45%",
         render: (item) => item,
      },
   ];

   useEffect(() => {
      const data = (dataJob?.jobSkills ?? [])?.map((item: any) => ({
         key: item?.id,
         name: item?.skill?.name,
         experience: item?.skill?.experience.replaceAll("_", " "),
      }));

      setDataSources(data);
   }, [dataJob]);
   return (
      <Spin spinning={loadingJob || fetchingJob}>
         <StyledCreateAndEditHr>
            <Row gutter={[20, 20]}>
               <Col span={24}>
                  <div className="title-container">
                     <span className="label">Job title:</span>
                     <span className="value">{dataJob?.title}</span>
                  </div>
               </Col>
               <Col span={24}>
                  <div className="listSkill">
                     <Row gutter={[10, 10]}>
                        <Col span={12}>
                           <div className="title-container">
                              <span className="label">Major:</span>
                              <span className="value">{dataJob?.major?.name}</span>
                           </div>
                        </Col>
                        <Col span={12}>
                           <div className="title-container">
                              <span className="label">Specialization:</span>
                              <span className="value">{dataJob?.specialization?.name}</span>
                           </div>
                        </Col>
                     </Row>

                     <span className="label" style={{ display: "block", marginTop: "20px" }}>
                        Skills List:
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
                     <span className="label">Quantity:</span>
                     <span className="value">{dataJob?.quantity}</span>
                  </div>
               </Col>
               <Col span={12}>
                  <div className="title-container">
                     <span className="label">Work place:</span>
                     <span className="value">{dataJob?.workPlace}</span>
                  </div>
               </Col>
               <Col span={12}>
                  <div className="title-container">
                     <span className="label">Salary:</span>
                     <span className="value">{dataJob?.salary}</span>
                  </div>
               </Col>
               <Col span={12}>
                  <div className="title-container">
                     <span className="label">Hours per week:</span>
                     <span className="value"> {dataJob?.hoursPerWeek}</span>
                  </div>
               </Col>
               <Col span={24}>
                  <span className="label">Description</span>
                  {Parser(`${dataJob?.description}`)}
               </Col>
            </Row>

            <span
               className="go-to-cvs"
               onClick={() => {
                  navigate(`${searchParams.get("id")}/cv-matched`);
               }}
            >
               View list CV
            </span>

            <GroupButton>
               <Button
                  onClick={() => {
                     handleClose();
                     searchParams.delete("id");
                     setSearchParams(searchParams);
                  }}
               >
                  {t("Back")}
               </Button>
            </GroupButton>
         </StyledCreateAndEditHr>
      </Spin>
   );
};

export default CreateJob;
