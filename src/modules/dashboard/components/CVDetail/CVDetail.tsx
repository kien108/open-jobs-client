import React, { useEffect, useRef, useState } from "react";
import { BtnFunction, Container, GroupButton, StyledListUnits } from "./styles";
import {
   useCommonSelector,
   RootState,
   useGetAdminByIdQuery,
   useModal,
} from "../../../../libs/common";
import {
   Button,
   DeleteIcon,
   Input,
   MinimizeIcon,
   Modal,
   openNotification,
   PlusIcon,
   Select,
   Table,
} from "../../../../libs/components";

import Parser from "html-react-parser";
import Avatar from "react-avatar";
import {
   useGetCVQuery,
   useGetMajorsQuery,
   useGetProfileQuery,
   useGetSkillsQuery,
   useGetSpecializationsQuery,
   useUpdateCVMutation,
} from "../../services";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Col, Divider, Row, Spin } from "antd";
import { MdEmail, MdOutlineNavigateNext } from "react-icons/md";
import { BsArrowLeft, BsFillPersonFill, BsPlusLg } from "react-icons/bs";

import { AiFillPhone } from "react-icons/ai";
import { ColumnsType } from "antd/es/table";
import { useNavigate, useParams } from "react-router-dom";
import { ExperienceValue } from "../../types/JobModel";

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

const CVDetail = () => {
   const { id } = useParams();
   const tableInstance = Table.useTable();
   const navigate = useNavigate();

   const temp = useRef();
   const { t } = useTranslation();
   const objectRef = useRef();
   const educationRef = useRef();
   const certificateRef = useRef();
   const experienceRef = useRef();
   const [majors, setMajors] = useState<any>([]);
   const [specializations, setSpecializations] = useState<any>([]);
   const [listSkill, setSkills] = useState<any>([]);
   const { isOpen: openConfirmMajor, handleClose: closeMajor, handleOpen: openMajor } = useModal();

   const { data: user, isLoading, isFetching } = useGetProfileQuery(id, { skip: !id });

   const [upload, { isLoading: loadingUpload }] = useUpdateCVMutation();
   const experiences = [
      {
         key: ExperienceValue.LESS_THAN_ONE_YEAR,
         label: ExperienceValue.LESS_THAN_ONE_YEAR,
         value: ExperienceValue.LESS_THAN_ONE_YEAR.replaceAll(" ", "_"),
         render: () => <span>{ExperienceValue.LESS_THAN_ONE_YEAR}</span>,
      },
      {
         key: ExperienceValue.ONE_TO_THREE_YEARS,
         label: ExperienceValue.ONE_TO_THREE_YEARS,
         value: ExperienceValue.ONE_TO_THREE_YEARS.replaceAll(" ", "_"),
         render: () => <span>{ExperienceValue.ONE_TO_THREE_YEARS}</span>,
      },
      {
         key: ExperienceValue.THREE_TO_FIVE_YEARS,
         label: ExperienceValue.THREE_TO_FIVE_YEARS,
         value: ExperienceValue.THREE_TO_FIVE_YEARS.replaceAll(" ", "_"),
         render: () => <span>{ExperienceValue.THREE_TO_FIVE_YEARS}</span>,
      },
      {
         key: ExperienceValue.MORE_THAN_FIVE_YEARS,
         label: ExperienceValue.MORE_THAN_FIVE_YEARS,
         value: ExperienceValue.MORE_THAN_FIVE_YEARS.replaceAll(" ", "_"),
         render: () => <span>{ExperienceValue.MORE_THAN_FIVE_YEARS}</span>,
      },
      {
         key: ExperienceValue.ANY,
         label: ExperienceValue.ANY,
         value: ExperienceValue.ANY,
         render: () => <span>{ExperienceValue.ANY}</span>,
      },
   ];

   const form = useForm<FormType>({
      defaultValues: {
         objective: "",
         education: "",
         experience: "",
         certificate: "",
         majorId: "",
         specializationId: undefined,
         title: "",
      },
      resolver: yupResolver(
         yup.object({
            objective: yup.string(),
            education: yup.string(),
            experience: yup.string(),
            certificate: yup.string(),
            majorId: yup.string().trim().required(t("common:form.required")),
            title: yup.string().trim().required(t("common:form.required")),
            specializationId: yup.string().trim().required(t("common:form.required")),
            listSkill: yup.array().of(
               yup
                  .object()
                  .shape(
                     {
                        name: yup
                           .string()
                           .trim()
                           .when("experience", {
                              is: (value: any) => value,
                              then: (schema: any) => schema.required(t("common:form.required")),
                           }),
                        experience: yup
                           .string()
                           .emptyAsUndefined()
                           .when("name", {
                              is: (value: any) => value,
                              then: (schema: any) => schema.required(t("common:form.required")),
                           }),
                     },
                     [["name", "experience"]]
                  )
                  .unique("name", t("Skill duplicate"))
            ),
         })
      ),
   });

   const {
      data: dataMajors,
      isLoading: loadingMajors,
      isFetching: fetchingMajors,
   } = useGetMajorsQuery({});
   const {
      data: dataSpecializations,
      isLoading: loadingSpecializations,
      isFetching: fetchingSpecializations,
   } = useGetSpecializationsQuery(form.watch("majorId"), {
      skip: !form.watch("majorId"),
      refetchOnMountOrArgChange: true,
   });

   const {
      data: dataSkills,
      isLoading: loadingSkills,
      isFetching: fetchingSkills,
   } = useGetSkillsQuery(form.watch("specializationId"), {
      skip: !form.watch("specializationId"),
      refetchOnMountOrArgChange: true,
   });

   const { fields, append, remove, update } = useFieldArray({
      control: form.control,
      name: "listSkill",
   });

   const columns: ColumnsType<any> = [
      {
         title: t("Name"),
         dataIndex: "name",
         key: "name",
         width: "45%",
         render: (item) => <span>{item.replaceAll("_", " ")}</span>,
      },
      {
         title: t("Exp"),
         dataIndex: "experience",
         key: "experience",
         width: "45%",
         render: (item) => <span>{item.replaceAll("_", " ")}</span>,
      },
   ];

   const onSubmit = (data: any) => {
      // data?.listSkill.forEach((item: any) => {
      //    listSkill.push({
      //       skill: {
      //          ...item,
      //       },
      //    });
      // });

      const body = {
         ...data,
         listSkill: data?.listSkill.map((item: any) => ({
            name: item?.name,
            experience: item?.experience,
            isVerified: item?.isVerified,
         })),
         id: user?.cv?.id,
         userId: id,
      };

      if (
         form.watch("listSkill").filter((item: any) => item?.name && item?.experience).length === 0
      ) {
         openNotification({
            type: "error",
            message: "Skills should not be empty!",
         });
      } else {
         upload(body)
            .unwrap()
            .then(() => {
               openNotification({
                  type: "success",
                  message: t("Update CV successfully!!!"),
               });
            })
            .catch((error) => {
               openNotification({
                  type: "error",
                  message: t("common:ERRORS.SERVER_ERROR"),
               });
            });
      }
   };

   useEffect(() => {
      const options = dataMajors?.map((item: any) => ({
         key: item.id,
         label: item.name,
         value: item.id,
         render: () => <span>{item?.name}</span>,
      }));

      setMajors(options || []);
   }, [dataMajors]);

   useEffect(() => {
      const options = dataSpecializations?.map((item: any) => ({
         key: item.id,
         label: item.name,
         value: item.id,
         render: () => <span>{item?.name}</span>,
      }));

      setSpecializations(options || []);
   }, [dataSpecializations]);

   useEffect(() => {
      const options = dataSkills?.map((item: any) => ({
         key: item.id,
         label: item.isVerified,
         value: item.name,
         render: () => <span>{item?.name}</span>,
      }));

      setSkills(options || []);
   }, [dataSkills]);

   useEffect(() => {
      if (!user) return;
      const { setValue } = form;

      setValue("listSkill", user?.cv?.listSkill);
   }, [user]);
   return (
      <Spin spinning={isLoading || isFetching}>
         <BtnFunction className="btn-back" onClick={() => navigate(-1)}>
            <BsArrowLeft size={23} />
         </BtnFunction>
         <Container>
            <FormProvider {...form}>
               <Row gutter={[30, 30]}>
                  <Col span={11}>
                     <div className="container">
                        <div className="general-information">
                           <Avatar
                              size="150"
                              round={true}
                              color={"rgb(66, 66, 66)"}
                              src={user?.avatarUrl}
                              fgColor="white"
                              maxInitials={2}
                              name={`${user?.firstName} ${user?.lastName}`}
                           />
                           <div className="cv-item">
                              <span className="title">Title</span>
                              <span>{user?.cv?.title || "hihihihihihihihi"}</span>
                           </div>

                           <div className="right">
                              <div className="item">
                                 <BsFillPersonFill size={17} />
                                 <span>{`${user?.firstName.toUpperCase()} ${user?.lastName.toUpperCase()}`}</span>
                              </div>
                              <div className="item">
                                 <MdEmail size={17} />
                                 <span>{user?.email}</span>
                              </div>
                              <div className="item">
                                 <AiFillPhone size={17} />
                                 <span>{user?.phone}</span>
                              </div>
                           </div>
                        </div>
                        <div className="extraInformation">
                           <div className="cv-item">
                              <span className="title">Objective</span>
                              {Parser(`${user?.cv?.objective}`)}
                           </div>
                        </div>
                     </div>
                  </Col>
                  <Col span={13}>
                     <div className="container">
                        <div className="listSkill">
                           <Row gutter={[10, 10]}>
                              <Col span={12}>
                                 <div className="cv-item">
                                    <span className="title">Major</span>
                                    <span>{user?.cv?.major?.name}</span>
                                 </div>
                              </Col>
                              <Col span={12}>
                                 <div className="cv-item">
                                    <span className="title">Specialization</span>
                                    <span>{user?.cv?.specialization?.name}</span>
                                 </div>
                              </Col>
                           </Row>

                           <div className="cv-item" style={{ marginTop: "20px" }}>
                              <span className="title">SKILLS</span>
                           </div>
                           <Col span={24}>
                              <Table
                                 dataSource={fields.map((item, index) => ({
                                    key: index,
                                    name: form.watch(`listSkill.[${index}].name`),
                                    experience: form.watch(`listSkill.[${index}].experience`),
                                    isVerified:
                                       form.watch(`listSkill.[${index}].isVerified`) || false,
                                 }))}
                                 tableInstance={tableInstance}
                                 columns={columns}
                                 totalPages={0}
                                 totalElements={0}
                                 showPagination={false}
                                 loading={false}
                              />
                           </Col>
                        </div>

                        <div className="objective">
                           <div className="cv-item">
                              <span className="title">Experience</span>
                              {Parser(`${user?.cv?.experience}`)}
                           </div>
                        </div>
                        <div className="objective">
                           <div className="cv-item">
                              <span className="title">Certificate</span>
                              {Parser(`${user?.cv?.certificate}`)}
                           </div>
                        </div>
                     </div>
                  </Col>
               </Row>
            </FormProvider>
            <Button
               loading={loadingUpload}
               className="btn-save"
               onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit(onSubmit)();
               }}
            >
               Accept
            </Button>
         </Container>
      </Spin>
   );
};

export default CVDetail;
