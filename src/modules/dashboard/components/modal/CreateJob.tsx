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

import { AiFillQuestionCircle } from "react-icons/ai";
import yup from "../../utils/yupGlobal";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormProvider, useForm, useFieldArray } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { Col, Divider, Radio, Row, Skeleton, Spin, Tooltip } from "antd";

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
import { WorkPlace } from "../../types/JobModel";
import { EmailVariables } from "../EmailVariables";
import {
   useCreateJobMutation,
   useGetBusinessQuery,
   useGetMajorsQuery,
   useGetSkillsQuery,
   useGetSpecializationsQuery,
} from "../../services";
import { BsPlusLg } from "react-icons/bs";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { convertEnumToArrayWithoutNumber, convertPrice, revertPrice } from "../../utils";
import { EJobLevels, EJobTypes, ESalaryType, EWorkPlace } from "../../../../types";
import { useGetJobCompanyQuery, useGetJobPriceMutation } from "../../services/JobAPIDashBoard";
import { Payment } from "../../container/Header/components";

interface ICreateAndEditAdmin {
   handleClose: () => void;
}

type FormType = {
   title: any;
   specialization: any;
   quantity: any;
   workPlace: any;
   majorId: any;
   specializationId: any;
   hoursPerWeek: any;
   maxSalary: any;
   minSalary: any;
   jobType: any;
   jobLevel: any;
   salaryType: any;
   description: any;
   expiredAt: any;
   skills: any;
   renewJobId: any;
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
   const [isRenew, setIsRenew] = useState<boolean>(true);
   const [des, setDes] = useState<any>("");

   const { isOpen: openConfirmMajor, handleClose: closeMajor, handleOpen: openMajor } = useModal();
   const { isOpen: openPay, handleClose: handleClosePay, handleOpen: handleOpenPay } = useModal();

   const { data: dataBusiness } = useGetBusinessQuery();
   const {
      isOpen: openModalPay,
      handleOpen: handleOpenModalPay,
      handleClose: handleCloseModalPay,
   } = useModal();
   const {
      isOpen: openModalPayConfirm,
      handleOpen: handleOpenPayConfirm,
      handleClose: handleClosePayConfirm,
   } = useModal();

   const form = useForm<FormType>({
      mode: "all",
      defaultValues: {
         title: "",
         quantity: "",
         workPlace: "",
         majorId: undefined,
         specializationId: undefined,
         hoursPerWeek: 40,
         minSalary: "",
         maxSalary: "",
         salaryType: ESalaryType.GROSS,
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
            salaryType: isNego
               ? yup.string().nullable()
               : yup.string().required(t("common:form.required")).nullable(),
            minSalary: isNego
               ? yup.string().nullable()
               : yup.string().required(t("common:form.required")).nullable(),
            maxSalary: isNego
               ? yup.string().nullable()
               : yup.string().required(t("common:form.required")).nullable(),
            skills: yup.array().of(
               yup
                  .object()
                  .shape(
                     {
                        name: yup
                           .string()
                           .trim()
                           .when("yoe", {
                              is: (value: any) => value,
                              then: (schema: any) => schema.required(t("common:form.required")),
                           }),
                        yoe: yup
                           .string()
                           .emptyAsUndefined()
                           .when("required", {
                              is: (value: any) => value === "true",
                              then: (schema: any) => schema.required(t("common:form.required")),
                           }),

                        required: yup.string(),
                     },
                     [
                        ["name", "yoe"],
                        ["yoe", "required"],
                     ]
                  )
                  .unique("name", t("Tên kỹ năng trùng"))
            ),
         })
      ),
   });

   const {
      data: dataCompany,
      isLoading,
      isFetching,
   } = useGetJobCompanyQuery(
      { id: user?.companyId, page: 0, size: 999 },
      {
         refetchOnMountOrArgChange: true,
         skip: !user?.companyId,
      }
   );

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

   const [getPrice, { isLoading: loadingGetPrice, data: dataPrice }] = useGetJobPriceMutation();

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
                  form.trigger(`skills.[${record.key}].yoe`);
                  form.trigger(`skills.[${record.key}].name`);
                  form.setValue(`skills.[${record.key}].isVerified`, option?.label);
               }}
               onClear={() => form.trigger(`skills.[${record.key}].yoe`)}
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
                           required: false,
                        });

                        // form.trigger(`skills.[${record.key}].yoe`);
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
         dataIndex: "yoe",
         key: "weight",
         width: "20%",
         render: (value, record) => (
            <Input
               parentName="skills"
               isFieldArray={true}
               type="numberFloat"
               decimal={1}
               name={`skills.[${record.key}].yoe`}
               disabled={!Boolean(form.watch(`skills.[${record.key}].required`))}
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
         dataIndex: "required",
         key: "required",
         width: "13%",
         render: (value, record) => (
            <Checkbox
               name={`skills.[${record.key}].required`}
               checked={value}
               onChange={(e) => {
                  form.setValue(`skills.[${record.key}].required`, e.target.checked, {
                     shouldValidate: true,
                  });
                  form.trigger(`skills.[${record.key}].yoe`);

                  !e.target.checked &&
                     form.setValue(`skills.[${record.key}].yoe`, "", {
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

   console.log(form.formState.errors);

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

   const salaryTypes = useMemo(() => {
      return convertEnumToArrayWithoutNumber(ESalaryType)?.map((item) => ({
         key: item.id,
         label: item.value,
         value: item.key,
         render: () => item.value,
      }));
   }, []);

   const workplaces = useMemo(() => {
      return convertEnumToArrayWithoutNumber(EWorkPlace)?.map((item) => ({
         key: item.id,
         label: item.value,
         value: item.key,
         render: () => item.value,
      }));
   }, []);

   const bindingJobLevelToWeight = (jobLevel: string) => {
      console.log({ jobLevel, dataBusiness: dataBusiness?.seniorWeight });

      switch (jobLevel) {
         case "FRESHER":
            return dataBusiness?.fresherWeight;

         case "INTERNSHIP":
            return dataBusiness?.internWeight;

         case "JUNIOR":
            return dataBusiness?.juniorWeight;
         case "MIDDLE":
            return dataBusiness?.middleWeight;
         case "SENIOR":
            return dataBusiness?.seniorWeight;

         case "HIGH_LEVEL_EXECUTIVE":
            return dataBusiness?.highPositionWeight;
         default:
            return 0;
      }
   };

   const onSubmit = (data: FormType) => {
      // createJob
      const payload = {
         companyId: user?.companyId,
         description: data?.description,
         expiredAt: moment(data?.expiredAt).format("x"),
         hoursPerWeek: data?.hoursPerWeek,
         jobLevel: data?.jobLevel,
         jobType: data?.jobType,
         listJobSkillDTO: data?.skills?.map((item: any) => ({
            isRequired: item?.required,
            skill: {
               isVerified: item?.isVerified,
               name: item?.name,
            },
            weight: item?.weight,
            yoe: item?.yoe,
         })),

         quantity: data?.quantity,
         salaryInfo: {
            isSalaryNegotiable: isNego,
            maxSalary: revertPrice(data?.maxSalary),
            minSalary: revertPrice(data?.minSalary),
            salaryType: data?.salaryType,
         },
         specializationId: data?.specializationId,
         title: data?.title,
         workPlace: data?.workPlace,
      };

      if (form.watch("skills").filter((item: any) => item?.name && item?.weight).length === 0) {
         openNotification({
            type: "error",
            message: "Kỹ năng không được để trống!",
         });
      } else {
         getPrice(payload)
            .unwrap()
            .then((res) => {
               console.log({ res });
               handleOpenPay();
            })
            .catch((error) => {
               openNotification({
                  type: "error",
                  message: "Tính toán giá tiền thất bại",
               });
            });
         // createJob(payload)
         //    .unwrap()
         //    .then(() => {
         //       openNotification({
         //          type: "success",
         //          message: t("Đăng tin tuyển dụng thành công!!!"),
         //       });
         //       handleClose();
         //    })
         //    .catch((error) => {
         //       openNotification({
         //          type: "error",
         //          message: t("common:ERRORS.SERVER_ERROR"),
         //       });
         //    });
      }
   };

   const handleCharge = (data: FormType) => {
      // createJob
      const payload = {
         jobPrice: dataPrice,
         companyId: user?.companyId,
         description: data?.description,
         expiredAt: moment(data?.expiredAt).format("x"),
         hoursPerWeek: data?.hoursPerWeek,
         jobLevel: data?.jobLevel,
         jobType: data?.jobType,
         listJobSkillDTO: data?.skills?.map((item: any) => ({
            isRequired: item?.required,
            skill: {
               isVerified: item?.isVerified,
               name: item?.name,
            },
            weight: item?.weight,
            yoe: item?.yoe,
         })),

         quantity: data?.quantity,
         salaryInfo: {
            isSalaryNegotiable: isNego,
            maxSalary: revertPrice(data?.maxSalary),
            minSalary: revertPrice(data?.minSalary),
            salaryType: data?.salaryType,
         },
         specializationId: data?.specializationId,
         title: data?.title,
         workPlace: data?.workPlace,
      };

      if (user?.company?.accountBalance >= +dataPrice) {
         createJob(payload)
            .unwrap()
            .then(() => {
               openNotification({
                  type: "success",
                  message: t("Đăng tin tuyển dụng thành công!!!"),
               });
               searchParams.set("refetch", uuidv4());
               setSearchParams(searchParams);
               handleClose();
            })
            .catch((error) => {
               openNotification({
                  type: "error",
                  message: t("common:ERRORS.SERVER_ERROR"),
               });
            });
      } else {
         handleOpenPayConfirm();
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
      const { reset, getValues } = form;
      const curJob = dataCompany?.listJob?.find((item) => item?.id === form.watch("renewJobId"));

      if (!curJob) return;

      const dataReset = {
         title: curJob?.title,
         quantity: curJob?.quantity,
         workPlace: curJob?.workPlace,
         majorId: curJob?.major?.id,
         specializationId: curJob?.specialization?.id,
         hoursPerWeek: curJob?.hoursPerWeek,
         maxSalary: convertPrice(curJob?.salaryInfo?.maxSalary),
         minSalary: convertPrice(curJob?.salaryInfo?.minSalary),
         jobType: curJob?.jobType,
         jobLevel: curJob?.jobLevel,
         salaryType: curJob?.salaryInfo?.salaryType,
         description: curJob?.description,
         expiredAt: moment(curJob?.expiredAt),
         skills: (curJob?.jobSkills ?? [])?.map((item) => ({
            key: item?.id,
            name: item?.skill?.name,
            required: item?.required,
            weight: item?.weight,
            yoe: item?.yoe,
            isVerified: item?.skill?.isVerified,
         })),
      };

      setIsNego(!!curJob?.salaryInfo?.isSalaryNegotiable);
      setDes(curJob?.description);

      reset({
         ...getValues(),
         ...dataReset,
      });
   }, [form.watch("renewJobId")]);

   const checkDiffTime = (time) => {
      const now = moment();
      const diffInMs = moment(time).diff(now);
      const diffInDays = parseInt(moment.duration(diffInMs).asDays());

      return diffInDays;
   };

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
                        <Spin spinning={isFetching}>
                           <Select
                              name="renewJobId"
                              title="Tin tuyển dụng cũ"
                              placeholder="Chọn tin tuyển dụng cũ"
                              required
                              options={(dataCompany?.listJob ?? [])?.map((item) => ({
                                 key: item?.id,
                                 label: item?.title,
                                 value: item?.id,
                                 render: () => <span>{item?.title}</span>,
                              }))}
                              loading={isFetching}
                           />
                        </Spin>
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
                                       <Tooltip title="Các kỹ năng bắt buộc sẽ phải nhập số năm kinh nghiệm">
                                          <AiFillQuestionCircle className="question" size={23} />
                                       </Tooltip>
                                    </div>
                                    <BtnFunction
                                       onClick={() =>
                                          append(
                                             { name: "", required: false, weight: 0 },
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
                                       yoe: form.watch(`skills.[${index}].yoe`),
                                       isVerified:
                                          form.watch(`skills.[${index}].isVerified`) || false,
                                       required: form.watch(`skills.[${index}].required`),
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
                     <Select name={"workPlace"} options={workplaces} title="WorkPlace" required />
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
                              placeholder="Nhập giá trị"
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
                              placeholder="Nhập giá trị"
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
                        <Col span={12}>
                           <Select
                              name="salaryType"
                              title="Loại lương"
                              required
                              options={salaryTypes}
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
                        data={des}
                        editorRef={contentRef}
                        name="description"
                        label="Description"
                     />
                  </Col>
               </Row>

               <GroupButton>
                  <Button
                     loading={loadingGetPrice}
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

         <Modal
            visible={openPay}
            type="confirm"
            confirmIcon="?"
            title={
               loadingGetPrice ? (
                  <Skeleton active />
               ) : (
                  <span>
                     Bạn có muốn sủ dụng{" "}
                     <span style={{ color: "#074ABD" }}>{` ${dataPrice} coins `}</span> để đăng tin
                     tuyển dụng này không ?
                  </span>
               )
            }
            onCancel={handleClosePay}
            destroyOnClose
         >
            <span style={{ marginTop: "4px", display: "block" }}>
               Giá tiền đăng tin được tính theo công thức sau: giá tin 1 ngày x trọng số level x (số
               ngày tin tồn tại - 1) ={" "}
               <span style={{ color: "rgb(7, 74, 189)" }} className="price">{`${
                  dataBusiness?.baseJobPricePerDay
               } x ${bindingJobLevelToWeight(form.getValues("jobLevel"))} x (${checkDiffTime(
                  form.getValues("expiredAt")
               )} - 1)`}</span>
            </span>
            <GroupButton>
               <Button
                  height={50}
                  onClick={() => form.handleSubmit(handleCharge)()}
                  loading={loadingCreateJob}
               >
                  Đồng ý
               </Button>
               <Button border="outline" height={50} onClick={handleClosePay}>
                  Hủy
               </Button>
            </GroupButton>
         </Modal>

         <Modal
            visible={openModalPayConfirm}
            type="confirm"
            confirmIcon="!"
            title={"Số dư tài khoản không đủ để thực hiện giao dịch! Bạn có muốn nạp tiền không?"}
            onCancel={() => {
               handleClosePay();
               handleClosePayConfirm();
            }}
            destroyOnClose
         >
            <GroupButton>
               <Button height={50} onClick={handleOpenModalPay}>
                  Nạp tiền ngay
               </Button>
               <Button
                  border="outline"
                  height={50}
                  onClick={() => {
                     handleClosePay();
                     handleClosePayConfirm();
                  }}
               >
                  Hủy bỏ
               </Button>
            </GroupButton>
         </Modal>

         <Modal
            visible={openModalPay}
            onCancel={() => {
               handleClosePay();
               handleClosePayConfirm();
               handleCloseModalPay();
            }}
            width="1200px"
         >
            <Payment />
         </Modal>
      </Spin>
   );
};

export default CreateJob;
