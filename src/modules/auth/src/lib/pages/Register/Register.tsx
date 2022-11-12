import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Button, Checkbox, Input, GoogleIcon } from "../../../../../../libs/components";
import { useLoginMutation } from "../../services";
import { AuthResponse } from "../../types/Responses";
import logo from "../../../../../../assets/img/logo.png";

import { saveRemember, saveUserId } from "../../../../../../libs/common";
import { useCommonDispatch } from "../../../../../../libs/common";

import { Col, Divider, Row } from "antd";
import {
   Contact,
   ContainerLogin,
   InputMessageStyled,
   LabelRemember,
   StyledButton,
   StyledForm,
   StyledGroupRemembers,
   StyledLogo,
} from "./styles";
import { useEffect, useState } from "react";

const Register = () => {
   const dispatch = useCommonDispatch();

   const { t } = useTranslation();
   const navigate = useNavigate();
   const location = useLocation();
   const [isRememberMe, setIsRememberMe] = useState(false);

   const from = location.state?.from || "/";

   const [error, setError] = useState(false);

   const [login, { isLoading }] = useLoginMutation();

   const form = useForm({
      defaultValues: {
         firstName: "",
         lastName: "",
         email: "",
         password: "",
      },
      resolver: yupResolver(
         yup.object({
            email: yup.string().required(t("common:form.required")),
            firstName: yup.string().required(t("common:form.required")),
            lastName: yup.string().required(t("common:form.required")),
            password: yup.string().required(t("common:form.required")),
         })
      ),
   });

   const { watch } = form;

   const onSubmit = (data: any) => {
      login({
         email: data.email,
         password: data.password,
         name: data.name,
      })
         .unwrap()
         .then((data: AuthResponse) => {
            if (isRememberMe) {
               dispatch(saveRemember({ isRemember: true } as any));
               localStorage.setItem("access_token", data["access-token"]);
            } else {
               dispatch(saveRemember({ isRemember: false } as any));
               sessionStorage.setItem("access_token", data["access-token"]);
            }

            dispatch(saveUserId({ id: data.id }));
            localStorage.setItem("userId", data.id);

            localStorage.setItem("refresh_token", data["refresh-token"]);
            navigate(from, { replace: true });
         })
         .catch((e) => {
            setError(true);
         });
   };

   useEffect(() => {
      const subscription = watch((value, { name, type }) => {
         if (type === "change") {
            setError(false);
         }
      });
      return () => subscription.unsubscribe();
   }, [watch]);

   useEffect(() => {
      if (localStorage.getItem("access_token") || sessionStorage.getItem("access_token")) {
         localStorage.removeItem("access_token");
         sessionStorage.removeItem("access_token");
      }
      if (localStorage.getItem("refresh_token")) {
         localStorage.removeItem("refresh_token");
      }
   }, []);
   return (
      <ContainerLogin>
         <FormProvider {...form}>
            <StyledForm>
               <StyledLogo src={logo} />
               <Row gutter={[20, 20]}>
                  <Col span={12}>
                     <Input
                        label={t("login.firstName")}
                        placeholder={t("login.enterFirstName")}
                        name="firstName"
                        required
                     />
                  </Col>
                  <Col span={12}>
                     <Input
                        label={t("login.lastName")}
                        placeholder={t("login.enterLastName")}
                        name="lastName"
                        required
                     />
                  </Col>
               </Row>
               <br />
               <Input
                  label={t("login.email")}
                  placeholder={t("login.enterEmail")}
                  name="email"
                  required
               />
               <br />
               <Input
                  label={t("login.password")}
                  placeholder={t("login.enterPassword")}
                  type="password"
                  name="password"
                  required
               />
               {error && <InputMessageStyled>{t("form.error")}</InputMessageStyled>}

               <Contact>
                  Already have an account? {""}
                  <Link className="redirect" to="/auth/login">
                     Sign in now!
                  </Link>
               </Contact>
               <StyledButton>
                  <Button loading={isLoading} onClick={() => form.handleSubmit(onSubmit)()}>
                     {t("login.register")}
                  </Button>
               </StyledButton>
            </StyledForm>
         </FormProvider>
      </ContainerLogin>
   );
};

export default Register;
