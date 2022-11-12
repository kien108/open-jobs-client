import { Navigate, Outlet, useLocation, useSearchParams } from "react-router-dom";

import { saveRemember } from "../../redux";
import { useCommonDispatch } from "../../redux";

const PrivateRoute = () => {
   const dispatch = useCommonDispatch();

   if (localStorage.getItem("access_token")) {
      dispatch(saveRemember({ isRemember: true } as any));
   }

   const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

   const location = useLocation();
   const [searchParams] = useSearchParams();

   if (!token) {
      return (
         <Navigate
            to="/auth/login"
            state={{
               from: `${location.pathname}${
                  searchParams.toString() ? "?" + searchParams.toString() : ""
               }`,
            }}
            replace
         />
      );
   }
   return <Outlet />;
};

export default PrivateRoute;
