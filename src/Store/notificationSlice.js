import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  message: '',
  type: '',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      console.log('Showing notification:', action.payload);
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
      console.log('Hiding notification');
      state.isOpen = false;
      state.message = '';
      state.type = '';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
