import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  id: '',
  compartmentData: '',
};

const compartmentSlice = createSlice({
  name: 'compartment',
  initialState,
  reducers: {
    getCompartment: (state, action) => {
      console.log("this is sugar ", action.payload);
      return {
        ...state,
        id: action.payload,
      };
    },
    loadCompartment: (state, action) => {
      console.log('this is soda ', action.payload);
      return {
        ...state,
        compartmentData: action.payload,
      };
    },
  },
});

export const { getCompartment, loadCompartment } = compartmentSlice.actions;

export default compartmentSlice.reducer;
