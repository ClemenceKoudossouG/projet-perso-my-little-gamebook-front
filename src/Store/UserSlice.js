import { createSlice } from '@reduxjs/toolkit';


export const initialState = {
  logged: false,
  email: '',
  password: '',
  token: '',
  firstname: '',
  lastname: '',
  alias: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SubmitLogin: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    },
    handleSuccessfulLogin: (state, action) => {
      return {
        ...state,
        ...action.payload,
        logged: true,
        password: '',
      };
    },
    SubmitNewUser: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        alias: action.payload.alias,
      };
    },
    handleSuccessufUserCreation: (state, action) => {
      return {
        ...state,
        ...action.payload,
        logged: true,
      };
    },
    handleLogOut: () => {
      console.log('here');
      return {
        ...initialState,
        logged: false,
      };
    },
  },
});

export const { handleSuccessfulLogin, SubmitLogin, SubmitNewUser, handleSuccessufUserCreation, handleLogOut } = userSlice.actions;

// Définition des types pour chaque action
export const HandleSuccessfulLoginType = 'user/handleSuccessfulLogin';
export const SubmitLoginType = 'user/submitLogin';

export default userSlice.reducer;
