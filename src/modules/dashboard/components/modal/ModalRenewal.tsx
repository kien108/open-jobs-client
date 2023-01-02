import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row } from "antd";
import moment from "moment";
import React, { FC } from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { Button, DatePicker } from "../../../../libs/components";
import { GroupButton } from "./styles";
import { useSearchParams } from "react-router-dom";
interface IProps {
   handleClose: () => void;
   expiredAt?: any;
}

const ModalRenewal: FC<IProps> = ({ handleClose, expiredAt }) => {
   const { t } = useTranslation();

   const [searchParams, setSearchParams] = useSearchParams();
   const form = useForm({
      mode: "all",
      defaultValues: {
         expiredAt: expiredAt ? moment(expiredAt) : "",
         newExpiredAt: "",
      },
      resolver: yupResolver(
         yup.object({
            expiredAt: yup.string().required(t("common:form.required")),
            newExpiredAt: yup.string().required(t("common:form.required")),
         })
      ),
   });

   const onSubmit = (data: any) => {
      console.log(data);
   };

   return (
      <FormProvider {...form}>
         <Row gutter={[30, 30]} style={{ marginTop: "30px" }}>
            <Col span={24}>
               <DatePicker
                  name="expiredAt"
                  label="Expired At"
                  required
                  format={"DD/MM/YYYY"}
                  disabled={true}
               />
            </Col>
            <Col span={24}>
               <DatePicker
                  name="newExpiredAt"
                  label="New Expired At"
                  required
                  format={"DD/MM/YYYY"}
                  disabledDate={(value) => moment(value).isBefore(moment())}
               />
            </Col>
         </Row>
         <GroupButton style={{ marginTop: "30px" }}>
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
   );
};

export default ModalRenewal;
