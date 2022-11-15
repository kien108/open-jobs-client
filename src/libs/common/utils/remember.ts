import { store } from "../redux/store";

export const getToken = () => {
   return localStorage.getItem("access_token");
};

export const setToken = (token: string) => {
   localStorage.setItem("access_token", token);
};
