import { useCommonSelector, RootState } from "../../common";

const usePermission = (permission: string[]) => {
   const res: boolean[] = [];
   const { permissions } = useCommonSelector((state: RootState) => state.user);

   permission.forEach((item) => {
      res.push(permissions?.includes(item));
   });

   return res;
};

export default usePermission;
