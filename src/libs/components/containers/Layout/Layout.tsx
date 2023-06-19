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
import { Layout as AntLayout } from "antd";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./styles.scss";
import { decodeToken } from "react-jwt";
import { saveUser } from "../../../common";
import { Header } from "../../Header";
import { access } from "fs";

const { Content, Sider } = AntLayout;

interface IToken {
   id: string;
}

const Layout = () => {
   const dispatch = useCommonDispatch();
   const navigate = useNavigate();
   const { id: userId } = useCommonSelector((state: RootState) => state.user.user);

   const location = useLocation();

   useEffect(() => {
      if (location.pathname.includes("oauth2")) {
         const search = location.search;

         const role = new URLSearchParams(search).get("role");
         const id = new URLSearchParams(search).get("id");
         const error = new URLSearchParams(search).get("error");

         const accessToken = new URLSearchParams(search).get("access-token");

         accessToken && setToken(accessToken);

         if (id) {
            dispatch(saveUserId({ id }));
            localStorage.setItem("userId", id);
            localStorage.removeItem("loginErr");
         }

         if (!role || !id || !accessToken) {
            localStorage.setItem("loginErr", error ? error : "INTERNAL SERVER ERROR");
            navigate("/auth");
         }

         switch (role) {
            case "USER":
               navigate("/");
               return;
            case "HR":
               navigate("/dashboard");
               return;
            default:
               return;
         }
      }
   }, []);

   const { data, isLoading } = useGetAdminByIdQuery(userId, { skip: !userId });

   useEffect(() => {
      if (!data) return;

      dispatch(saveUser(data));
   }, [data]);

   console.log("sadf");

   return (
      <AntLayout hasSider>
         <AntLayout style={{ background: "#fff" }}>
            <Header />
            <Content className="site-layout-content">
               <Outlet />
            </Content>
         </AntLayout>
      </AntLayout>
   );
};

export default Layout;
