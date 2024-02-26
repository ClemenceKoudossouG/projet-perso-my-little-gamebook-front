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
} from './UserSlice';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_USER') {
    const token = localStorage.getItem('token');
    //  const { id } = store.getState().user;
    fetch('http://localhost:3000/user', {
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
          throw new Error("Erreur lors de la création de l'utilisateur");
        }
        return res.json();
      })
      .then((data) => {
        const signUpAction = handleSuccessfulUserCreation(data);
        store.dispatch(signUpAction);
      })
      .catch((error) => {
        const errorAction = handleUserCreationError(error.message);
        store.dispatch(errorAction);
      });
  } else if (action.type === 'PATCH_PROFILE') {
    const { id } = store.getState().user;
    fetch(`http://localhost:3000/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${store.getState().user.token}`,
      },
      body: JSON.stringify({
        email: store.getState().user.email,
        password: store.getState().user.password,
        firstname: store.getState().user.firstname,
        lastname: store.getState().user.lastname,
        alias: store.getState().user.alias,
        avatar: store.getState().user.avatar || '',
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de l'édition du profil");
        }
        return res.json();
      })
      .then((data) => {
        const editProfile = handleSuccessfulProfileEdition(data);
        store.dispatch(editProfile);
      })
      .catch((error) => {
        const errorAction = handleProfileEditionError(error.message);
        store.dispatch(errorAction);
      });
  } else if (action.type === 'DELETE_PROFILE') {
    const token = localStorage.getItem('token');
    const { id } = store.getState().user;
    fetch(`http://localhost:3000/user/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors de la suppression du profil');
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
