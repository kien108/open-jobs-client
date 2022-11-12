import React, { FC, ReactNode, useEffect, useRef, useState } from "react";

import {
   Button,
   Input,
   MinimizeIcon,
   openNotification,
   OptionType,
   PlusIcon,
   Select,
   Switch,
} from "../../../../libs/components";

import {
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

import { useDebounce, useGetAdminByIdQuery } from "../../../../libs/common";
import { useSearchParams } from "react-router-dom";
import Avatar from "react-avatar";
import { randomColor } from "../../../../utils";

import { v4 as uuidv4 } from "uuid";
import { ExperienceValue, WorkPlace } from "../../types/JobModel";
import { EmailVariables } from "../EmailVariables";

interface ICreateAndEditAdmin {
   handleClose: () => void;
}

const CreateJob: FC<ICreateAndEditAdmin> = ({ handleClose }) => {
   const { t } = useTranslation();
   const [searchParams, setSearchParams] = useSearchParams();

   const [majors, setMajors] = useState<any>([]);
   const [specializations, setSpecializations] = useState<any>([]);

   const [message, setMessage] = useState<string | undefined>(undefined);
   const contentRef = useRef<any>(null);

   const form = useForm({
      mode: "all",
      defaultValues: {
         jobTitle: "",
         skills: [{}],
         major: "",
         specialization: "",
         quantity: "",
         workplace: "",
         salary: "",
         hours: 0,
      },
      resolver: yupResolver(
         yup.object({
            jobTitle: yup.string().trim().required(t("common:form.required")),
            major: yup.string().trim().required(t("common:form.required")),
            specialization: yup.string().trim().required(t("common:form.required")),
            salary: yup.string().trim().required(t("common:form.required")),
            quantity: yup.number().emptyAsUndefined(),
            hours: yup.number().emptyAsUndefined(),
            workplace: yup.string(),

            skills: yup.array().of(
               yup
                  .object()
                  .shape(
                     {
                        skill: yup
                           .string()
                           .trim()
                           .when("exp", {
                              is: (value: any) => value,
                              then: (schema: any) => schema.required(t("common:form.required")),
                           }),
                        exp: yup
                           .number()
                           .integer(t("common:form.integer"))
                           .emptyAsUndefined()
                           .when("skill", {
                              is: (value: any) => value,
                              then: (schema: any) => schema.required(t("common:form.required")),
                           }),
                     },
                     [["skill", "exp"]]
                  )
                  .unique("skill", t("uom.uomDuplicate"))
            ),
         })
      ),
   });

   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "skills",
   });

   // const [checkedStatus, setCheckedStatus] = useState<boolean>(form.getValues("isActive"));

   // const [createHeadHunter, { isLoading: loadingCreate }] = useCreateHeadHunterMutation();

   // const [updateHr, { isLoading: loadingUpdate }] = useUpdateHrMutation();

   // const { data: dataAccount, isLoading: loadingAccount } = useGetByIdQuery(
   //    searchParams.get("id")!,
   //    {
   //       skip: !searchParams.get("id"),
   //       refetchOnMountOrArgChange: true,
   //    }
   // );

   const onSubmit = (data: any) => {};

   const handleAddMoreSkill = () => {
      append({ skill: "", exp: "ANY" });
   };

   const resetDuplicate = () => {
      form.watch("skills").forEach((item: any, index) => {
         form
            .watch("skills")
            .filter(
               (item1: any, idx) =>
                  item1.skill.toUpperCase() === item.skill.toUpperCase() &&
                  index !== idx &&
                  item.skill !== ""
            ).length === 0 && form.clearErrors(`skills.${index}.skill` as any);
      });
   };

   useEffect(() => {
      const fakeData = [
         {
            name: "java",
            id: "1",
         },
         {
            name: "Js",
            id: "2",
         },
         {
            name: "C#",
            id: "3",
         },
      ];

      const options = fakeData.map((item) => ({
         key: item.id,
         label: item.name,
         value: item.id,
         render: () => <span>{item?.name}</span>,
      }));

      setMajors(options);
      setSpecializations(options);
   }, []);

   const experiences = [
      {
         key: ExperienceValue.LESS_THAN_ONE_YEAR,
         label: ExperienceValue.LESS_THAN_ONE_YEAR,
         value: ExperienceValue.LESS_THAN_ONE_YEAR,
         render: () => <span>{ExperienceValue.LESS_THAN_ONE_YEAR}</span>,
      },
      {
         key: ExperienceValue.ONE_TO_THREE_YEARS,
         label: ExperienceValue.ONE_TO_THREE_YEARS,
         value: ExperienceValue.ONE_TO_THREE_YEARS,
         render: () => <span>{ExperienceValue.ONE_TO_THREE_YEARS}</span>,
      },
      {
         key: ExperienceValue.THREE_TO_FIVE_YEARS,
         label: ExperienceValue.THREE_TO_FIVE_YEARS,
         value: ExperienceValue.THREE_TO_FIVE_YEARS,
         render: () => <span>{ExperienceValue.THREE_TO_FIVE_YEARS}</span>,
      },
      {
         key: ExperienceValue.MORE_THAN_FIVE_YEARS,
         label: ExperienceValue.MORE_THAN_FIVE_YEARS,
         value: ExperienceValue.MORE_THAN_FIVE_YEARS,
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
         value: WorkPlace.WORK_FROM_HOME,
         render: () => <span>{WorkPlace.WORK_FROM_HOME}</span>,
      },
      {
         key: WorkPlace.HYBRID,
         label: WorkPlace.HYBRID,
         value: WorkPlace.HYBRID,
         render: () => <span>{WorkPlace.HYBRID}</span>,
      },
   ];

   return (
      <Spin spinning={false}>
         <StyledCreateAndEditHr>
            <FormProvider {...form}>
               <Row gutter={[20, 20]}>
                  <Col span={24}>
                     <Input
                        required
                        label={t("Job Title")}
                        name="jobTitle"
                        placeholder={t("Enter job title")}
                     />
                  </Col>
                  <Col span={12}>
                     <Select
                        name="major"
                        title="Major"
                        placeholder="Select major"
                        required
                        showSearch
                        options={majors || []}
                        loading={false}
                     />
                  </Col>
                  <Col span={12}>
                     <Select
                        required
                        disabled={!form.watch("major")}
                        name="specialization"
                        title="Specialization"
                        placeholder="Please choose major first!"
                        showSearch={true}
                        options={specializations || []}
                        loading={false}
                     />
                  </Col>

                  {form.watch("major") && form.watch("specialization") && (
                     <>
                        <Col span={24}>
                           <Row justify="space-between" align="middle">
                              <Col span={10}>
                                 <span className="derived-title derived-name">{t("Skill")}</span>
                              </Col>
                              <Col span={10} push={1}>
                                 <span className="derived-title">{t("Experience")}</span>
                              </Col>
                              <Col>
                                 <div className="icon-plus" onClick={handleAddMoreSkill}>
                                    <PlusIcon />
                                 </div>
                              </Col>
                           </Row>
                        </Col>

                        <Col span={24}>
                           <Divider style={{ margin: "-10px 0" }} />
                        </Col>
                        <Col span={24}>
                           <StyledListUnits>
                              {fields &&
                                 fields.length > 0 &&
                                 fields.map((field: any, index) => (
                                    <Row justify="space-between" align="top" key={field.id}>
                                       <Col span={10}>
                                          <Select
                                             required
                                             name={`skills.${index}.skill`}
                                             placeholder={t("Select skill")}
                                             showSearch={true}
                                             options={specializations || []}
                                             loading={false}
                                          />
                                       </Col>
                                       <Col span={10} push={1}>
                                          <Select
                                             name={`skills.${index}.exp`}
                                             options={experiences}
                                             defaultValue={["ANY"]}
                                          />
                                          {/* <Input
                                          parentName="skills"
                                          name={`skills.${index}.exp`}
                                          placeholder={t("uom.enterRatio")}
                                          isFieldArray={true}
                                       /> */}
                                       </Col>
                                       <Col>
                                          <div className="icon-minus" onClick={() => remove(index)}>
                                             <MinimizeIcon />
                                          </div>
                                       </Col>
                                    </Row>
                                 ))}
                           </StyledListUnits>
                        </Col>
                     </>
                  )}

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
                        name={"workplace"}
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
                        name="hours"
                        placeholder={t("Enter hours per week")}
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
                     loading={false}
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
      </Spin>
   );
};

export default CreateJob;
