import { handleSuccessfulLogin, SubmitLogin, SubmitLoginType } from './UserSlice';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'SUBMIT_LOGIN') {
    console.log('middleware after if?');
    console.log(store.getState().user);
    // Utilisation du type d'action correct
    fetch('http://localhost:3002/login', {
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
  }

  return next(action);
};

export default authMiddleware;
