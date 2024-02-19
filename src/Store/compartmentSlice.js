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
      return {
        ...state,
        id: action.payload,
      };
    },
    loadCompartment: (state, action) => {
      return {
        ...state,
        compartmentData: action.payload,
      };
    },
  },
});

export const { getCompartment, loadCompartment } = compartmentSlice.actions;

export default compartmentSlice.reducer;
