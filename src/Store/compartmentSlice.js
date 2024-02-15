import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  id: '',
};

const compartmentSlice = createSlice({
  name: 'compartment',
  initialState,
  reducers: {
    GetCompartment: (state, action) => {
      return {
        ...state,
        id: action.payload,
      };
    },
  },
});

export const { GetCompartment } = compartmentSlice.actions;

export default compartmentSlice.reducer;
