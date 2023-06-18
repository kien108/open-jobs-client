import { createSlice } from "@reduxjs/toolkit";

const isOpen = localStorage.getItem("openSidebar");

const initialState: { isOpen: boolean } = {
   isOpen: isOpen ? JSON.parse(isOpen) : false,
};

export const sidebarSlice = createSlice({
   name: "sidebar",
   initialState,
   reducers: {
      changeSidebar: (state) => {
         state.isOpen = !state.isOpen;
         localStorage.setItem("openSidebar", JSON.stringify(state.isOpen));
      },
   },
});

export const { changeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
