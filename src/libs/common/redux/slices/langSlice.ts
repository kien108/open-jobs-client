import { createSlice } from '@reduxjs/toolkit';

const lng = localStorage.getItem('i18nextLng');

const initialState = {
  lang: lng ? lng : 'en'
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    }
  }
});

export const { changeLang } = langSlice.actions;

export default langSlice.reducer;
