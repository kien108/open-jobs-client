import { useNavigate } from "react-router-dom";

import { useRole } from "../../../common";

interface PermissionRouteProps {
   roles: string[];
   component: JSX.Element;
}

const PermissionRoute = ({ roles, component }: PermissionRouteProps) => {
   const navigate = useNavigate();

   if (!useRole(roles)) {
      navigate("/overview");
      return null;
   }
   return component;
};

export default PermissionRoute;
