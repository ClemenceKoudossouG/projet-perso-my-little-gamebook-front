import { handleSuccessfulLogin, handleSuccessufUserCreation, SubmitLogin, SubmitLoginType } from './UserSlice';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'SUBMIT_LOGIN') {
    console.log('middleware after if?');
    console.log(store.getState().user);
    // Utilisation du type d'action correct
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
      .then((res) => res.json())
      .then((data) => {
        const loginAction = handleSuccessfulLogin(data);
        store.dispatch(loginAction);
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
      .then((res) => res.json())
      .then((data) => {
        const signUpAction = handleSuccessufUserCreation(data);
        store.dispatch(signUpAction);
      });
  }

  return next(action);
};

export default authMiddleware;
