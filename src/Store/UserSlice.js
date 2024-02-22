import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  logged: false,
  email: '',
  password: '',
  token: '',
  firstname: '',
  lastname: '',
  alias: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        alias: action.payload.alias,
        avatar: action.payload.avatar,
      };
    },
    /* loadUser: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        alias: action.payload.alias,
        avatar: action.payload.avatar,
      };
    }, */
    handleSuccessfulLogin: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload.token,
        logged: true,
        token: action.payload.token,
        password: '',
      };
    },
    handleSuccessufUserCreation: (state, action) => {
      return {
        ...state,
        ...action.payload,
        logged: true,
      };
    },
    handleSuccessufProfileEdition: (state, action) => {
      return {
        ...state,
        ...action.payload,
        logged: true,
      };
    },

    SubmitLogin: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
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
    PatchProfile: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        alias: action.payload.alias,
        avatar: action.payload.avatar,
      };
    },
    handleLogOut: () => {
      localStorage.removeItem('token');
      return {
        ...initialState,
        logged: false,
        token: '',
      };
    },
    handleLoginError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        logged: false,
      };
    },
    handleUserCreationError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        logged: false,
      };
    },
    handleProfileEditionError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        logged: false,
      };
    },
  },
});

export const {
  getUser,
  loadUser,
  handleSuccessfulLogin,
  handleSuccessufUserCreation,
  handleSuccessufProfileEdition,
  SubmitLogin,
  SubmitNewUser,
  PatchProfile,
  handleLogOut,
  handleLoginError,
  handleUserCreationError,
  handleProfileEditionError,
} = userSlice.actions;

// Définition des types pour chaque action
export const HandleSuccessfulLoginType = 'user/handleSuccessfulLogin';
export const SubmitLoginType = 'user/submitLogin';

export default userSlice.reducer;
