import React, { useEffect, useRef, useState } from "react";
import { BtnFunction, Container, GroupButton, StyledBtnsHeader, StyledListUnits } from "./styles";
import {
   useCommonSelector,
   RootState,
   useGetAdminByIdQuery,
   useModal,
} from "../../../../../../libs/common";
import {
   Button,
   DeleteIcon,
   DownloadIcon,
   Input,
   MinimizeIcon,
   Modal,
   openNotification,
   PlusIcon,
   Select,
   Table,
   Title,
} from "../../../../../../libs/components";

import Avatar from "react-avatar";
import {
   useGetCVQuery,
   useGetMajorsQuery,
   useGetProfileQuery,
   useGetSkillsQuery,
   useGetSpecializationsQuery,
   useUpdateCVMutation,
} from "../../services";
import { EmailVariables } from "../../../../../dashboard/components/EmailVariables";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Col, Divider, Row, Space, Spin } from "antd";
import { MdEmail, MdOutlineNavigateNext } from "react-icons/md";
import { BsArrowLeft, BsFillPersonFill, BsPlusLg } from "react-icons/bs";

import { AiFillPhone } from "react-icons/ai";
import { ExperienceValue } from "../../../../../dashboard/types/JobModel";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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
import { useReactToPrint } from "react-to-print";
import { EditorEdit } from "../EditorEdit";

const CV = () => {
   const { id } = useCommonSelector((state: RootState) => state.user.user);
   const tableInstance = Table.useTable();
   const navigate = useNavigate();

   const cvRef = useRef<any>(null);

   const temp = useRef();
   const { t } = useTranslation();
   const objectRef = useRef();
   const educationRef = useRef();
   const certificateRef = useRef();
   const experienceRef = useRef();
   const [majors, setMajors] = useState<any>([]);
   const [specializations, setSpecializations] = useState<any>([]);
   const [searchSkill, setSearchSkill] = useState<string>("");

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
            majorId: yup.string().trim().required("Trường này không được để trống!"),
            title: yup.string().trim().required("Trường này không được để trống!"),
            specializationId: yup.string().trim().required("Trường này không được để trống!"),
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
                              then: (schema: any) =>
                                 schema.required("Trường này không được để trống!"),
                           }),
                        experience: yup
                           .string()
                           .emptyAsUndefined()
                           .when("name", {
                              is: (value: any) => value,
                              then: (schema: any) =>
                                 schema.required("Trường này không được để trống!"),
                           }),
                     },
                     [["name", "experience"]]
                  )
                  .unique("name", "Kỹ năng trùng!")
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
         title: "Tên",
         dataIndex: "name",
         key: "name",
         width: "45%",
         render: (_: string, record: any) => (
            <Select
               name={`listSkill.[${record.key}].name`}
               placeholder="Select skill"
               options={listSkill || []}
               onSelect={(value: any, option: any) => {
                  form.trigger(`listSkill.[${record.key}].experience`);
                  form.trigger(`listSkill.[${record.key}].name`);
                  form.setValue(`listSkill.[${record.key}].isVerified`, option?.label);
               }}
               showSearch
               onSearch={(value) => setSearchSkill(value)}
               notFoundContent={
                  <span
                     onClick={() => {
                        form.setValue(`listSkill.[${record.key}].name`, searchSkill, {
                           shouldValidate: true,
                        });

                        update(record?.key, {
                           name: searchSkill,
                           isVerified: false,
                        });

                        form.trigger(`listSkill.[${record.key}].experience`);
                        form.trigger(`listSkill.[${record.key}].name`);
                     }}
                  >{`${searchSkill} (new skill)`}</span>
               }
               onClear={() => form.trigger(`listSkill.[${record.key}].experience`)}
               loading={false}
            />
         ),
      },
      {
         title: "Kinh nghiệm",
         dataIndex: "experience",
         key: "experience",
         width: "45%",

         render: (_: string, record: any) => (
            <Select
               name={`listSkill.[${record.key}].experience`}
               placeholder="Select experience"
               onSelect={() => {
                  form.trigger(`listSkill.[${record.key}].experience`);
                  form.trigger(`listSkill.[${record.key}].name`);
               }}
               onClear={() => form.trigger(`listSkill.[${record.key}].name`)}
               options={experiences || []}
               loading={false}
            />
         ),
      },

      {
         title: "Chức năng",
         dataIndex: "id",
         width: "10%",

         render: (_: string, record: any) => (
            <BtnFunction
               className="btn-remove"
               onClick={() => {
                  if (form.watch("listSkill").length > 1) {
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
      const listSkill: any = [];

      data?.listSkill.forEach((item: any) => {
         listSkill.push({
            skill: {
               ...item,
            },
         });
      });
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
                  message: "Cập nhật hồ sơ thành công!",
               });
               navigate(-1);
            })
            .catch((error) => {
               openNotification({
                  type: "error",
                  message: "Lỗi máy chủ!",
               });
            });
      }
   };

   // const handleExport = () => {
   //    html2canvas(cvRef.current).then((canvas) => {
   //       const imgData = canvas.toDataURL("image/png");
   //       const pdf = new jsPDF({ format: "a4", unit: "px" });
   //       const imgProps = pdf.getImageProperties(canvas);
   //       const pdfWidth = pdf.internal.pageSize.getWidth();
   //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

   //       console.log({ imgData });
   //       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

   //       pdf.save("your-cv.pdf");
   //    });
   // };
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
      setValue("title", user?.cv?.title);
      setValue("objective", user?.cv?.objective || "");
      setValue("education", user?.cv?.education || "");
      setValue("experience", user?.cv?.experience || "");
      setValue("certificate", user?.cv?.certificate || "");

      setValue("majorId", user?.cv?.major?.id);
      setValue("specializationId", user?.cv?.specialization?.id);
   }, [user]);
   return (
      <Spin spinning={isLoading || isFetching}>
         <BtnFunction className="btn-back" onClick={() => navigate(-1)}>
            <BsArrowLeft size={23} />
         </BtnFunction>
         <Title style={{ textAlign: "center" }}>Edit CV</Title>
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
                           <Input name="title" label={"Tiêu đề"} required className="title-cv" />

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
                           <div className="objective">
                              <EditorEdit
                                 data={user?.cv?.objective}
                                 editorRef={objectRef}
                                 name="objective"
                                 label={"Giới thiệu bản thân"}
                              />
                              {/* <EmailVariables /> */}
                           </div>
                           <div className="objective">
                              <EditorEdit
                                 data={user?.cv?.education}
                                 editorRef={educationRef}
                                 name="education"
                                 label={"Học vấn"}
                              />

                              {/* <EmailVariables
                                 data={user?.cv?.education}
                                 editorRef={educationRef}
                                 name="education"
                                 label={t("education")}
                              /> */}
                           </div>
                        </div>
                     </div>
                  </Col>
                  <Col span={13}>
                     <div className="container">
                        <div className="listSkill">
                           <Row gutter={[10, 10]}>
                              <Col span={12}>
                                 <Select
                                    name="majorId"
                                    title={"Chuyên ngành"}
                                    placeholder="Select major"
                                    required
                                    onSelect={() => {
                                       form.setValue("specializationId", "");
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
                                       title={"Chuyên môn"}
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
                              </>
                           )}
                        </div>

                        <div className="objective">
                           <EditorEdit
                              data={user?.cv?.experience}
                              editorRef={experienceRef}
                              name="experience"
                              label={"Kinh nghiệm"}
                           />
                           {/* <EmailVariables
                              data={user?.cv?.experience}
                              editorRef={experienceRef}
                              name="experience"
                              label={t("experience")}
                           /> */}
                        </div>
                        <div className="objective">
                           <EditorEdit
                              data={user?.cv?.certificate}
                              editorRef={certificateRef}
                              name="certificate"
                              label={"Chứng chỉ"}
                           />
                           {/* <EmailVariables
                              data={user?.cv?.certificate}
                              editorRef={certificateRef}
                              name="certificate"
                              label={t("certificate")}
                           /> */}
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
               Lưu
            </Button>
            <Modal
               type="confirm"
               open={openConfirmMajor}
               onCancel={() => {
                  closeMajor();
               }}
               confirmIcon="?"
               title={"Thay đổi chuyên ngành sẽ làm mới tất cả kỹ năng. Bạn có chắc chắn không ?"}
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
                     Hủy
                  </Button>
                  <Button
                     height={44}
                     key="submit"
                     onClick={() => {
                        form.setValue("specializationId", "");
                        form.setValue("listSkill", []);
                        closeMajor();
                     }}
                  >
                     Đồng ý
                  </Button>
               </GroupButton>
            </Modal>
         </Container>
      </Spin>
   );
};

export default CV;
