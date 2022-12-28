import React, { FC, ReactNode, useEffect, useRef, useState } from "react";

import {
   Button,
   DatePicker,
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
import { useSearchParams } from "react-router-dom";
import Avatar from "react-avatar";
import { randomColor } from "../../../../utils";

import { v4 as uuidv4 } from "uuid";
import { ExperienceValue, WorkPlace } from "../../types/JobModel";
import { EmailVariables } from "../EmailVariables";
import {
   useCreateJobMutation,
   useGetMajorsQuery,
   useGetSkillsQuery,
   useGetSpecializationsQuery,
} from "../../services";
import { BsPlusLg } from "react-icons/bs";
import { ColumnsType } from "antd/es/table";

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
   const [searchParams, setSearchParams] = useSearchParams();
   const tableInstance = Table.useTable();
   const { user } = useCommonSelector((state: RootState) => state.user);

   const [majors, setMajors] = useState<any>([]);
   const [specializations, setSpecializations] = useState<any>([]);
   const [listSkill, setSkills] = useState<any>([]);
   const [message, setMessage] = useState<string | undefined>(undefined);
   const contentRef = useRef<any>(null);
   const [searchSkill, setSearchSkill] = useState<string>("");
   const { isOpen: openConfirmMajor, handleClose: closeMajor, handleOpen: openMajor } = useModal();

   const form = useForm<FormType>({
      mode: "all",
      defaultValues: {
         title: "",
         quantity: "",
         workPlace: "",
         salary: "",
         majorId: undefined,
         specializationId: undefined,
         hoursPerWeek: 0,
      },
      resolver: yupResolver(
         yup.object({
            title: yup.string().trim().required(t("common:form.required")),
            majorId: yup.string().trim().required(t("common:form.required")),
            specializationId: yup.string().trim().required(t("common:form.required")),
            salary: yup.string().trim().required(t("common:form.required")),
            quantity: yup.number().emptyAsUndefined(),
            hoursPerWeek: yup.number().emptyAsUndefined(),
            workPlace: yup.string(),
            expiredAt: yup.string().required(t("common:form.required")),
            skills: yup.array().of(
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

   const [createJob, { isLoading: loadingCreateJob }] = useCreateJobMutation();
   const { fields, append, remove, update } = useFieldArray({
      control: form.control,
      name: "skills",
   });

   const handleAddMoreSkill = () => {
      append({ skill: "", experience: "ANY" });
   };

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

   const workplaces = [
      {
         key: WorkPlace.ONSITE,
         label: WorkPlace.ONSITE,
         value: WorkPlace.ONSITE,
         render: () => <span>{WorkPlace.ONSITE}</span>,
      },
      {
         key: WorkPlace.WORK_FROM_HOME,
         label: WorkPlace.WORK_FROM_HOME,
         value: WorkPlace.WORK_FROM_HOME.replaceAll(" ", "_"),
         render: () => <span>{WorkPlace.WORK_FROM_HOME}</span>,
      },
      {
         key: WorkPlace.HYBRID,
         label: WorkPlace.HYBRID,
         value: WorkPlace.HYBRID,
         render: () => <span>{WorkPlace.HYBRID}</span>,
      },
   ];
   const columns: ColumnsType<any> = [
      {
         title: t("Name"),
         dataIndex: "name",
         key: "name",
         width: "45%",
         render: (_: string, record: any) => (
            <Select
               name={`skills.[${record.key}].name`}
               placeholder="Select skill"
               options={listSkill || []}
               onSelect={(value: any, option: any) => {
                  form.trigger(`skills.[${record.key}].experience`);
                  form.trigger(`skills.[${record.key}].name`);
                  form.setValue(`skills.[${record.key}].isVerified`, option?.label);
               }}
               onClear={() => form.trigger(`skills.[${record.key}].experience`)}
               onSearch={(value) => setSearchSkill(value)}
               showSearch
               notFoundContent={
                  <span
                     onClick={() => {
                        form.setValue(`skills.[${record.key}].name`, searchSkill, {
                           shouldValidate: true,
                        });

                        update(record?.key, {
                           name: searchSkill,
                           isVerified: false,
                        });

                        form.trigger(`skills.[${record.key}].experience`);
                        form.trigger(`skills.[${record.key}].name`);
                     }}
                  >{`${searchSkill} (new skill)`}</span>
               }
               loading={false}
            />
         ),
      },
      {
         title: t("EXP"),
         dataIndex: "experience",
         key: "experience",
         width: "45%",

         render: (_: string, record: any) => (
            <Select
               name={`skills.[${record.key}].experience`}
               placeholder="Select experience"
               onSelect={() => {
                  form.trigger(`skills.[${record.key}].experience`);
                  form.trigger(`skills.[${record.key}].name`);
               }}
               onClear={() => form.trigger(`skills.[${record.key}].name`)}
               options={experiences || []}
               loading={false}
            />
         ),
      },

      {
         title: t("Action"),
         dataIndex: "id",
         width: "10%",

         render: (_: string, record: any) => (
            <BtnFunction
               className="btn-remove"
               onClick={() => {
                  if (form.watch("skills").length > 1) {
                     remove(record?.key);
                  } else {
                     openNotification({
                        type: "error",
                        message: "Skills should not be empty!",
                     });
                  }
               }}
            >
               <DeleteIcon />
            </BtnFunction>
         ),
      },
   ];

   const onSubmit = (data: any) => {
      // createJob
      const body = {
         ...data,
         companyId: user?.companyId,
         listJobSkillDTO: data?.skills.map((item: any) => ({
            isRequired: true,
            skill: item,
         })),
      };

      if (form.watch("skills").filter((item: any) => item?.name && item?.experience).length === 0) {
         openNotification({
            type: "error",
            message: "Skills should not be empty!",
         });
      } else {
         createJob(body)
            .unwrap()
            .then(() => {
               openNotification({
                  type: "success",
                  message: t("Post job successfully!!!"),
               });
               handleClose();
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

   console.log(form.watch("skills"));
   return (
      <Spin spinning={false}>
         <StyledCreateAndEditHr>
            <FormProvider {...form}>
               <Row gutter={[20, 20]}>
                  <Col span={24}>
                     <Input
                        required
                        label={t("Job Title")}
                        name="title"
                        placeholder={t("Enter job title")}
                     />
                  </Col>
                  <Col span={24}>
                     <div className="listSkill">
                        <Row gutter={[10, 10]}>
                           <Col span={12}>
                              <Select
                                 name="majorId"
                                 title="Major"
                                 placeholder="Select major"
                                 required
                                 onSelect={() => {
                                    if (form.watch("specializationId")) {
                                       openMajor();
                                    }
                                 }}
                                 options={majors || []}
                                 loading={false}
                              />
                           </Col>
                           <Col span={12}>
                              <Spin spinning={loadingSpecializations || fetchingSpecializations}>
                                 <Select
                                    required
                                    disabled={!form.watch("majorId")}
                                    name="specializationId"
                                    title="Specialization"
                                    placeholder="Please choose major first!"
                                    options={specializations || []}
                                    loading={false}
                                 />
                              </Spin>
                           </Col>
                        </Row>

                        {form.watch("majorId") && form.watch("specializationId") && (
                           <>
                              <Col span={24}>
                                 <GroupButton>
                                    <div className="cv-item" style={{ marginTop: "20px" }}>
                                       <span className="title">SKILLS</span>
                                    </div>
                                    <BtnFunction
                                       onClick={() => append({ name: "", experience: "" })}
                                    >
                                       <BsPlusLg />
                                    </BtnFunction>
                                 </GroupButton>

                                 <Table
                                    dataSource={fields.map((item, index) => ({
                                       key: index,
                                       name: form.watch(`skills.[${index}].name`),
                                       experience: form.watch(`skills.[${index}].experience`),
                                       isVerified:
                                          form.watch(`skills.[${index}].isVerified`) || false,
                                    }))}
                                    tableInstance={tableInstance}
                                    columns={columns}
                                    totalPages={0}
                                    totalElements={0}
                                    showPagination={false}
                                    loading={false}
                                 />
                              </Col>
                           </>
                        )}
                     </div>
                  </Col>

                  <Col span={12}>
                     <Input
                        type="number"
                        label={t("Quantity")}
                        name="quantity"
                        placeholder={t("Enter quantity")}
                     />
                  </Col>
                  <Col span={12}>
                     <Select
                        name={"workPlace"}
                        options={workplaces}
                        title="WorkPlace"
                        defaultValue={["ONSITE"]}
                     />
                  </Col>
                  <Col span={12}>
                     <Input
                        required
                        label={t("Salary")}
                        name="salary"
                        placeholder={t("10,000,000")}
                     />
                  </Col>
                  <Col span={12}>
                     <Input
                        type="number"
                        label={t("Hours per week")}
                        name="hoursPerWeek"
                        placeholder={t("Enter hoursPerWeek per week")}
                     />
                  </Col>
                  <Col span={12}>
                     <DatePicker
                        name="expiredAt"
                        label="Expired At"
                        required
                        format={"DD/MM/YYYY"}
                     />
                  </Col>
                  <Col span={24}>
                     <EmailVariables
                        editorRef={contentRef}
                        name="description"
                        label="Description"
                     />
                  </Col>
               </Row>

               <GroupButton>
                  <Button
                     loading={loadingCreateJob}
                     onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit(onSubmit)();
                     }}
                  >
                     {t("common:confirm.save")}
                  </Button>
                  <Button
                     onClick={() => {
                        handleClose();
                        searchParams.delete("id");
                        setSearchParams(searchParams);
                     }}
                     border="outline"
                  >
                     {t("common:confirm.cancel")}
                  </Button>
               </GroupButton>
            </FormProvider>
         </StyledCreateAndEditHr>
         <Modal
            type="confirm"
            open={openConfirmMajor}
            onCancel={() => {
               searchParams.delete("id");
               setSearchParams(searchParams);
               closeMajor();
            }}
            confirmIcon="?"
            title={t("Change major will be reset specializations and skills. Are you sure?")}
         >
            <GroupButton>
               <Button
                  height={44}
                  style={{ padding: "0 24px" }}
                  key="back"
                  border="outline"
                  onClick={() => {
                     closeMajor();
                  }}
               >
                  {t("common:confirm.cancel")}
               </Button>
               <Button
                  loading={false}
                  height={44}
                  key="submit"
                  onClick={() => {
                     form.setValue("specializationId", "");
                     form.setValue("skills", []);
                     closeMajor();
                  }}
               >
                  {t(t("common:confirm.ok"))}
               </Button>
            </GroupButton>
         </Modal>
      </Spin>
   );
};

export default CreateJob;
