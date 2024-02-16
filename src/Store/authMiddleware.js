import { handleSuccessfulLogin, handleSuccessufUserCreation, handleLoginError, handleUserCreationError } from './UserSlice';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'SUBMIT_LOGIN') {
    fetch('http://localhost:3000/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: store.getState().user.email,
        password: store.getState().user.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors de la connexion');
        }
        return res.json();
      })
      .then((data) => {
        const loginAction = handleSuccessfulLogin(data);
        store.dispatch(loginAction);
      })
      .catch((error) => {
        const errorAction = handleLoginError(error.message);
        store.dispatch(errorAction);
      });
  } else if (action.type === 'SUBMIT_NEWUSER') {
    fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: store.getState().user.email,
        password: store.getState().user.password,
        firstname: store.getState().user.firstname,
        lastname: store.getState().user.lastname,
        alias: store.getState().user.alias,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors de la création de l\'utilisateur');
        }
        return res.json();
      })
      .then((data) => {
        const signUpAction = handleSuccessufUserCreation(data);
        store.dispatch(signUpAction);
      })
      .catch((error) => {
        const errorAction = handleUserCreationError(error.message);
        store.dispatch(errorAction);
      });
  }

  return next(action);
};

export default authMiddleware;
