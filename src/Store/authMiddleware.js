import { handleSuccessfulLogin } from './UserSlice';
import { submitLogin } from './UserSlice'; // Ajout de l'action de soumission du formulaire

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === submitLogin.type) { // Utilisation du type d'action correct
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
