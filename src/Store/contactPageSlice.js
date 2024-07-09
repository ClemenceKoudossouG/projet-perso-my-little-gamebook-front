import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  email: '',
  name: '',
  message: '',
  successfulContact: false,
};

const contactPageSlice = createSlice({
  name: 'contactPage',
  initialState,
  reducers: {
    handleSuccessfulContact: (state) => {
      state.successfulContact = true;
      state.error = null;
    },
    SubmitContact: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        message: action.payload.message,
      };
    },
    contactError: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    clearContactError: (state) => {
      state.error = null;
    },
  },
});

export const {
  handleSuccessfulContact,
  SubmitContact,
  contactError,
  clearContactError,
} = contactPageSlice.actions;

export default contactPageSlice.reducer;
