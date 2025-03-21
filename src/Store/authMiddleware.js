import {
  getUser,
  // loadUser,
  handleSuccessfulLogin,
  handleSuccessfulUserCreation,
  handleSuccessfulProfileEdition,
  // SubmitLogin,
  // SubmitNewUser,
  // SubmitProfile,
  handleUserCreationError,
  handleLoginError,
  handleProfileEditionError,
  DeleteProfile,
  handleResetEmailError,
  SubmitPassword,
  handlePasswordResetError,
} from './UserSlice';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_USER') {
    const token = localStorage.getItem('token');
    //  const { id } = store.getState().user;
    fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Ajout du token dans le headers mais pas de diff avec ou sans.
      },
      // Retrait des infos user car pas nécessaires ici, le token est suffisant. Plus safe en se contentant de l'envoi du token.
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        store.dispatch(getUser);
      });
  } else if (action.type === 'SUBMIT_LOGIN') {
    fetch(`${API_BASE_URL}/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        alias: store.getState().user.alias,
        password: store.getState().user.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Oups ! La connexion a échoué.');
        }
        return res.json();
      })
      .then((data) => {
        const loginAction = handleSuccessfulLogin(data);
        store.dispatch(loginAction);
        // On enlève l'éventuel message d'erreur login résiduel (pour éviter son apparition sur le profil)
        store.dispatch(handleProfileEditionError(null));
      })
      .catch((error) => {
        const errorAction = handleLoginError(error.message);
        store.dispatch(errorAction);
      });
  } else if (action.type === 'SUBMIT_EMAIL') {
    fetch(`${API_BASE_URL}/request-password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: store.getState().user.email,
      }),
    })
      .then((res) => {
        if (res.status === 500) {
          throw new Error('Oups ! La demande de réinitialisation a échoué.');
        } else if (res.status === 404) {
          throw new Error('Email utilisateur inconnu au bataillon !');
        }
        return res.json();
      })
      .then((data) => {
        store.dispatch({ type: 'SUBMIT_EMAIL_SUCCESS', payload: data });
      })
      .catch((error) => {
        store.dispatch(handleResetEmailError({ error: error.message }));
      });
  } else if (action.type === 'SUBMIT_NEW_PASSWORD') {
    // console.log('Submitting new password with token:', resetToken);
    // const { password, resetToken } = store.getState().user;
    fetch(`${API_BASE_URL}/request-password-reset/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: store.getState().user.password,
        resetToken: store.getState().user.resetToken,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Oups ! La réinitialisation a échoué.');
        }
        return res.json();
      })
      .then((data) => {
        store.dispatch(SubmitPassword(data));
      })
      .catch((error) => {
        store.dispatch(handlePasswordResetError({ resetError: error.message }));
      });
  } else if (action.type === 'SUBMIT_NEWUSER') {
    fetch(`${API_BASE_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: store.getState().user.email,
        password: store.getState().user.password,
        alias: store.getState().user.alias,
      }),
    })
      .then(async (res) => {
        if (res.status === 409) {
          const data = await res.json();
          if (data.error.includes('pseudo')) {
            throw new Error(
              'Oups ! Ce pseudo est déjà pris, tu dois en choisir un autre !'
            );
          } else if (data.error.includes('email')) {
            throw new Error(
              'Cet email est déjà utilisé, veuillez en choisir un autre ou vous connecter.'
            );
          } else {
            throw new Error(data.error);
          }
        }
        if (!res.ok) {
          throw new Error("Oups ! L'utilisateur n'a pas pu être créé.");
        }
        return res.json();
      })
      .then((data) => {
        store.dispatch(handleSuccessfulUserCreation(data));
      })
      .catch((error) => {
        store.dispatch(handleUserCreationError({ error: error.message }));
      });
  } else if (action.type === 'PATCH_PROFILE') {
    const { id } = store.getState().user;

    fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${store.getState().user.token}`,
      },
      body: JSON.stringify({
        email: store.getState().user.email,
        alias: store.getState().user.alias,
        avatar: store.getState().user.avatar || '',
      }),
    })
      .then((res) => {
        // const data = res.json();
        if (res.status === 409) {
          throw new Error(
            'Ce pseudo est déjà pris, tu dois en choisir un autre !'
          );
        } else if (!res.ok) {
          throw new Error("Oups ! Le profil n'a pas pu être modifié.");
        }
        return res.json();
      })
      .then((data) => {
        const editProfile = handleSuccessfulProfileEdition(data);
        store.dispatch(editProfile);
        store.dispatch({ type: 'PROFILE_EDIT_SUCCESS' });
        // On s'assure que le nouvel avatar reste bien dans le local storage (évite les bugs au refresh)
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((error) => {
        const errorAction = handleProfileEditionError(error.message);
        store.dispatch(errorAction);
      });
  } else if (action.type === 'DELETE_PROFILE') {
    const token = localStorage.getItem('token');
    const { id } = store.getState().user;
    fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Oups ! Le profil n'a pas pu être supprimé.");
        }
        const deleteAction = DeleteProfile();
        store.dispatch(deleteAction);
        return res.json();
      })
      .catch((error) => {
        const errorAction = handleProfileEditionError(error.message);
        store.dispatch(errorAction);
      });
  }
  return next(action);
};
export default authMiddleware;
