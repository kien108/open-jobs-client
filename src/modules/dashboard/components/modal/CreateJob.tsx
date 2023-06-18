import React, { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";

import {
   Button,
   Checkbox,
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
import { Col, Divider, Radio, Row, Spin } from "antd";

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
import moment from "moment";
import { convertEnumToArrayWithoutNumber, convertPrice } from "../../utils";
import { EJobLevels, EJobTypes } from "../../../../types";

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
   maxSalary: any;
   minSalary: any;
   jobType: any;
   jobLevel: any;
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
   const [isNego, setIsNego] = useState<boolean>(false);
   const [isRenew, setIsRenew] = useState<boolean>(false);

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
         minSalary: "",
         maxSalary: "",
      },
      resolver: yupResolver(
         yup.object({
            title: yup.string().trim().required(t("common:form.required")),
            majorId: yup.string().trim().required(t("common:form.required")),
            specializationId: yup.string().trim().required(t("common:form.required")),
            quantity: yup.number().emptyAsUndefined(),
            hoursPerWeek: yup.number().emptyAsUndefined(),
            workPlace: yup.string().required(t("common:form.required")).nullable(),
            expiredAt: yup.string().required(t("common:form.required")).nullable(),
            jobType: yup.string().required(t("common:form.required")).nullable(),
            jobLevel: yup.string().required(t("common:form.required")).nullable(),
            minSalary: isNego
               ? yup.string()
               : yup.string().required(t("common:form.required")).nullable(),
            maxSalary: isNego
               ? yup.string()
               : yup.string().required(t("common:form.required")).nullable(),
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
                           })
                           .when("isRequired", {
                              is: (value: any) => value === "true",
                              then: (schema: any) => schema.required(t("common:form.required")),
                           }),

                        isRequired: yup.string(),
                     },
                     [
                        ["name", "experience"],
                        ["experience", "isRequired"],
                     ]
                  )
                  .unique("name", t("Tên kỹ năng trùng"))
            ),
         })
      ),
   });

   console.log(form.formState.errors);

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
         width: "23%",
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
                     style={{ color: "#000", fontWeight: 500, cursor: "pointer", width: "100%" }}
                     onClick={() => {
                        form.setValue(`skills.[${record.key}].name`, searchSkill, {
                           shouldValidate: true,
                        });

                        update(record?.key, {
                           name: searchSkill,
                           isVerified: false,
                        });

                        // form.trigger(`skills.[${record.key}].experience`);
                        form.trigger(`skills.[${record.key}].name`);
                     }}
                  >{`${searchSkill} (new skill)`}</span>
               }
               loading={false}
            />
         ),
      },
      {
         title: "Năm kinh nghiệm",
         dataIndex: "experience",
         key: "weight",
         width: "20%",
         render: (value, record) => (
            <Input
               parentName="skills"
               isFieldArray={true}
               type="number"
               name={`skills.[${record.key}].experience`}
               disabled={!Boolean(form.watch(`skills.[${record.key}].isRequired`))}
               allowClear
            />
         ),
      },
      {
         title: "Độ ưu tiên / 100%",
         dataIndex: "weight",
         key: "weight",
         width: "30%",
         render: (value, record) => (
            <Input
               type="number"
               name={`skills.[${record.key}].weight`}
               onChange={(value) => handleEnterWeight(record?.key, value)}
               allowClear
            />
         ),
      },
      {
         title: "Bắt buộc",
         dataIndex: "isRequired",
         key: "weight",
         width: "13%",
         render: (value, record) => (
            <Checkbox
               name={`skills.[${record.key}].isRequired`}
               onChange={(e) => {
                  form.setValue(`skills.[${record.key}].isRequired`, e.target.checked, {
                     shouldValidate: true,
                  });
                  form.trigger(`skills.[${record.key}].experience`);

                  !e.target.checked &&
                     form.setValue(`skills.[${record.key}].experience`, "", {
                        shouldValidate: true,
                     });
               }}
            />
         ),
      },

      {
         title: "Chức năng",
         dataIndex: "id",
         width: "14%",

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

   const handleEnterWeight = (idx: any, value: any) => {
      const name = `skills.${idx}.weight` as any;

      let remainWeight = 0;

      form.watch("skills")?.map((item: any, index: any) => {
         if (idx !== index) {
            remainWeight += Number(item?.weight);
         }
      });

      let result = Number(value);

      if (remainWeight >= 100) {
         form.setValue(name, 0);
         return;
      }

      if (remainWeight + Number(value) > 100) {
         result = 100 - remainWeight;
      }

      form.setValue(name, result);
   };

   const jobLevels = useMemo(() => {
      return convertEnumToArrayWithoutNumber(EJobLevels)?.map((item) => ({
         key: item.id,
         label: item.value,
         value: item.key,
         render: () => item.value,
      }));
   }, []);

   const jobTypes = useMemo(() => {
      return convertEnumToArrayWithoutNumber(EJobTypes)?.map((item) => ({
         key: item.id,
         label: item.value,
         value: item.key,
         render: () => item.value,
      }));
   }, []);

   const onSubmit = (data: any) => {
      // createJob
      const body = {
         ...data,
         companyId: user?.companyId,
         expiredAt: moment(data?.expiredAt).format("x"),
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

   return (
      <Spin spinning={false}>
         <StyledCreateAndEditHr>
            <FormProvider {...form}>
               <Row gutter={[20, 20]}>
                  <Col span={12}>
                     <Radio.Group onChange={(e) => setIsRenew(e.target.value)} value={isRenew}>
                        <Radio value={true}>Tạo mới</Radio>
                        <Radio value={false}>Sử dụng tin tuyển dụng cũ</Radio>
                     </Radio.Group>
                  </Col>

                  {!isRenew && (
                     <Col span={12}>
                        <Select
                           name="majorId"
                           title="Tin tuyển dụng cũ"
                           placeholder="Select major"
                           required
                           options={majors || []}
                           loading={false}
                        />
                     </Col>
                  )}

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
                                       onClick={() =>
                                          append(
                                             { name: "", isRequired: false, weight: 0 },
                                             { shouldFocus: true }
                                          )
                                       }
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
                     <Spin spinning={false}>
                        <Select name="jobLevel" title="Vị trí" required options={jobLevels} />
                     </Spin>
                  </Col>

                  <Col span={12}>
                     <Spin spinning={false}>
                        <Select name="jobType" title="Loaị công việc" required options={jobTypes} />
                     </Spin>
                  </Col>
                  <Col span={12}>
                     <Select
                        name={"workPlace"}
                        options={workplaces}
                        title="WorkPlace"
                        defaultValue={["ONSITE"]}
                        required
                     />
                  </Col>

                  <Col span={12}>
                     <Radio.Group onChange={(e) => setIsNego(e.target.value)} value={isNego}>
                        <Radio value={true}>Lương thỏa thuận</Radio>
                        <Radio value={false}>Mức lương</Radio>
                     </Radio.Group>
                  </Col>
                  {!isNego && (
                     <>
                        <Col span={6}>
                           <Input
                              className="minSalary"
                              label="Lương tối thiểu"
                              name="minSalary"
                              allowClear
                              required
                              onChange={(e: any) => {
                                 form.setValue("minSalary", convertPrice(e.target.value), {
                                    shouldValidate: true,
                                 });
                              }}
                           />
                        </Col>
                        <Col span={6}>
                           <Input
                              className="maxSalary"
                              label="Lương tối đa"
                              name="maxSalary"
                              allowClear
                              required
                              onChange={(e: any) => {
                                 form.setValue("maxSalary", convertPrice(e.target.value), {
                                    shouldValidate: true,
                                 });
                              }}
                           />
                        </Col>
                     </>
                  )}
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
                        label="Ngày hết hạn"
                        required
                        format={"DD/MM/YYYY"}
                        disabledDate={(value) => moment(value).isBefore(moment())}
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

               <span className="note">
                  * Tin tuyển dụng hết hạn sẽ bị xoá sau 7 ngày (Bạn có thể gia hạn tin tuyển dụng)
               </span>
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
