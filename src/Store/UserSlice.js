import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  logged: !!localStorage.getItem('token'),
  email: '',
  password: '',
  token: localStorage.getItem('token'),
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
        ...action.payload,
      };
    },
    handleSuccessfulLogin: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        logged: true,
        password: '',
        token: action.payload,
      };
    },
    handleSuccessfulUserCreation: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        logged: true,
      };
    },
    handleSuccessfulProfileEdition: (state, action) => {
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
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        alias: action.payload.alias,
        avatar: action.payload.avatar,
      };
    },
    DeleteProfile: () => {
      return {
        logged: false,
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
        // logged: false,
      };
    },
    checkLoggedIn: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        return {
          ...state,
          logged: true,
          token,
        };
      }
      return {
        ...state,
        logged: false,
        token: null,
      };
    },
  },
});

export const {
  getUser,
  loadUser,
  handleSuccessfulLogin,
  handleSuccessfulUserCreation,
  handleSuccessfulProfileEdition,
  SubmitLogin,
  SubmitNewUser,
  PatchProfile,
  DeleteProfile,
  handleLogOut,
  handleLoginError,
  handleUserCreationError,
  handleProfileEditionError,
  checkLoggedIn,
} = userSlice.actions;

// Définition des types pour chaque action
export const HandleSuccessfulLoginType = 'user/handleSuccessfulLogin';
export const SubmitLoginType = 'user/submitLogin';

export default userSlice.reducer;
