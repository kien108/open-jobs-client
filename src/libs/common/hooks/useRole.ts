import { RootState, useCommonSelector } from "../redux";

export const useRole = (roles: string[]) => {
   const { role } = useCommonSelector((state: RootState) => state.user.user);
   return roles.includes(role);
};
