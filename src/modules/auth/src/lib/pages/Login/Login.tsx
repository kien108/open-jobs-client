import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import {
   Button,
   Checkbox,
   Input,
   GoogleIcon,
   openNotification,
} from "../../../../../../libs/components";
import { useLoginMutation } from "../../services";
import { AuthResponse } from "../../types/Responses";
import logo from "../../../../../../assets/img/logo.png";

import { saveRemember, saveUserId } from "../../../../../../libs/common";
import { useCommonDispatch } from "../../../../../../libs/common";

import { Divider } from "antd";
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
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useEffect, useState } from "react";

const Login = () => {
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
         email: "",
         password: "",
      },
      resolver: yupResolver(
         yup.object({
            email: yup.string().required("Trường này không được để trống!"),
            password: yup.string().required("Trường này không được để trống!"),
         })
      ),
   });

   const { watch } = form;

   const onSubmit = (data: any) => {
      login({
         email: data.email,
         password: data.password,
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

            if (data?.role === "HR") {
               navigate("/dashboard");
            } else {
               navigate(from, { replace: true });
            }
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
      localStorage.removeItem("userId");
   }, []);

   useEffect(() => {
      if (localStorage.getItem("loginErr")) {
         openNotification({
            type: "error",
            message: localStorage.getItem("loginErr") ?? "Lỗi máy chủ",
            duration: 5,
         });

         localStorage.removeItem("loginErr");
      }
   }, []);
   return (
      <ContainerLogin>
         <FormProvider {...form}>
            <StyledForm>
               <Button className="btn-back" onClick={() => navigate("/overview/welcome")}>
                  <HiOutlineArrowNarrowLeft size={18} />
                  Về trang chủ
               </Button>
               <StyledLogo src={logo} />
               <StyledButton className="btn-google">
                  <Button
                     icon={<GoogleIcon />}
                     onClick={() =>
                        window.open(
                           "http://localhost/api/web/oauth2/authorize/google?redirect_uri=http://localhost:5173/oauth2/redirect"
                        )
                     }
                  >
                     Sign in with Google
                  </Button>
               </StyledButton>

               <Contact>
                  Bạn muốn hợp tác với chúng tôi?{" "}
                  <Link className="redirect" to="/auth/register">
                     Đăng ký ngay!
                  </Link>
               </Contact>

               {/* <Divider orientation="center">Or</Divider>

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
                  // handleForgot={() => console.log("forgot")}
                  required
               />
               {error && <InputMessageStyled>{t("form.error")}</InputMessageStyled>}
               <StyledGroupRemembers>
                  <Checkbox
                     id="remember"
                     onChange={(e) => {
                        setIsRememberMe(e.target.checked);
                     }}
                  />
                  <LabelRemember htmlFor="remember">{t("login.remember")}</LabelRemember>
               </StyledGroupRemembers>

               <StyledButton>
                  <Button loading={isLoading} onClick={() => form.handleSubmit(onSubmit)()}>
                     {t("login.btn")}
                  </Button>
               </StyledButton> */}
            </StyledForm>
         </FormProvider>
      </ContainerLogin>
   );
};

export default Login;
