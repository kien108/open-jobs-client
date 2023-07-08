import { Sidebar } from "../../Sidebar";
import {
   getToken,
   RootState,
   saveUserId,
   setToken,
   useCommonDispatch,
   useCommonSelector,
   useGetAdminByIdQuery,
} from "../../../common";
import { Layout as AntLayout, Spin } from "antd";
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import "./styles.scss";
import { decodeToken } from "react-jwt";
import { saveUser } from "../../../common";
import { Header } from "../../Header";
import { access } from "fs";

const { Content, Sider } = AntLayout;
import { BackTop } from "antd";
import { Button, Modal } from "../../../components";
interface IToken {
   id: string;
}
import { BiHappyHeartEyes } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";

const Layout = () => {
   const dispatch = useCommonDispatch();
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const { id: userId, companyId } = useCommonSelector((state: RootState) => state.user.user);

   const location = useLocation();

   useEffect(() => {
      if (location.pathname.includes("oauth2")) {
         const search = location.search;

         const role = new URLSearchParams(search).get("role");
         const id = new URLSearchParams(search).get("id");
         const error = searchParams.get("error");

         const accessToken = new URLSearchParams(search).get("access-token");

         accessToken && setToken(accessToken);

         if (id) {
            dispatch(saveUserId({ id }));
            localStorage.setItem("userId", id);
            localStorage.removeItem("loginErr");
         }

         if (!role || !id || !accessToken) {
            localStorage.setItem(
               "loginErr",
               error
                  ? "Tài khoản của bạn đã bị vô hiệu hoá! Liên hệ quản trị viên của OpenJob để biết thêm chi tiết!"
                  : "INTERNAL SERVER ERROR"
            );
            navigate("/auth");
         }

         switch (role) {
            case "USER":
               const prevUrl = localStorage.getItem("prevUrl");
               console.log({ prevUrl });
               if (prevUrl) {
                  navigate(prevUrl);
                  return;
               }
               navigate("/");

               return;
            case "HR":
               navigate("/dashboard");
               localStorage.setItem("COMPANY_ID", id || "");
               return;
            default:
               return;
         }
      }
   }, []);

   const { data, isFetching } = useGetAdminByIdQuery(userId, { skip: !userId });

   useEffect(() => {
      if (!data) return;

      dispatch(saveUser(data));
   }, [data]);

   console.log({ data: data?.cv });

   const visibleForceModal =
      !isFetching &&
      !!getToken() &&
      !location.pathname.includes("/profile/cv/edit") &&
      !Boolean(data?.cv);
   return (
      <Spin spinning={isFetching}>
         <AntLayout hasSider>
            <AntLayout style={{ background: "#f5f5f5" }}>
               <Header />
               <Content className="site-layout-content">
                  <Outlet />
                  <BackTop />
               </Content>
            </AntLayout>
            <Modal
               visible={visibleForceModal}
               type="confirm"
               confirmIcon={<BiHappyHeartEyes size={100} color="green" />}
               title={
                  <span>
                     Chào mừng ứng viên mới đến với openjobs. Bạn vui lòng tạo hồ sơ trước khi tìm
                     việc nhé <AiFillHeart color="red" size={17} />
                  </span>
               }
               destroyOnClose
            >
               <Button
                  style={{ width: "fit-content", margin: "0 auto", marginTop: "30px" }}
                  className="btn-cv"
                  onClick={() => navigate(`/overview/profile/cv/edit`)}
               >
                  Tạo hồ sơ ngay
               </Button>
            </Modal>
         </AntLayout>
      </Spin>
   );
};

export default Layout;
