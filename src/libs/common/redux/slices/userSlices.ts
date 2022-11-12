import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IUserGeneral {
   role: string;
   id: string;
   firstName: string;
   lastName: string;
}

export interface PermissionState {
   isRemember: boolean;
   user: IUserGeneral;
}

const initialState: PermissionState = {
   user: {
      id: localStorage.getItem("userId") || "",
      role: "",
      firstName: "",
      lastName: "",
   },
   isRemember: false,
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      saveUser: (state, action: PayloadAction<IUserGeneral>) => {
         state.user = action.payload;
      },
      saveRemember: (state, action: PayloadAction<PermissionState>) => {
         state.isRemember = action.payload.isRemember;
      },
      saveUserId: (state, action: { payload: { id: string } }) => {
         state.user.id = action.payload.id;
      },
   },
});

export const { saveUser, saveRemember, saveUserId } = userSlice.actions;

export default userSlice.reducer;
