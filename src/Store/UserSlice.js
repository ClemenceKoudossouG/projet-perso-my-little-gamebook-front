import { createSlice } from '@reduxjs/toolkit';


export const initialState = {
  logged: false,
  email: '',
  password: '',
  token: '',
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
    ChangeFieldValue: (state, action) => {
      if (action.payload.inputName === 'logged') {
        return {
          ...state,
          logged: action.payload.inputValue,
        };
      }
      return {
        ...state,
        [action.payload.inputName]: action.payload.inputValue,
      };
    },
    handleSuccessfulLogin: (state, action) => {
      return {
        ...state,
        ...action.payload,
        logged: true,
      };
    },
  },
});

export const { ChangeFieldValue, handleSuccessfulLogin, SubmitLogin } =
  userSlice.actions;

// Définition des types pour chaque action
export const ChangeFieldValueType = 'user/ChangeFieldValue';
export const HandleSuccessfulLoginType = 'user/handleSuccessfulLogin';
export const SubmitLoginType = 'user/submitLogin';

// Ajout d'une action pour la soumission du formulaire de connexion
// export const submitLogin = () => ({
//   type: SubmitLoginType,
// });

export default userSlice.reducer;