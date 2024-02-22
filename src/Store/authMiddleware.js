import {
  getUser,
  // loadUser,
  handleSuccessfulLogin,
  handleSuccessufUserCreation,
  handleSuccessufProfileEdition,
  // SubmitLogin,
  // SubmitNewUser,
  // SubmitProfile,
  handleUserCreationError,
  handleLoginError,
  handleProfileEditionError,
} from './UserSlice';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_USER') {
    //  const { id } = store.getState().user;
    fetch('http://localhost:3000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: store.getState().user.email,
        password: store.getState().user.password,
        firstname: store.getState().user.firstname,
        lastname: store.getState().user.lastname,
        alias: store.getState().user.alias,
        avatar: store.getState().user.alias,
      }),
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
        const signUpAction = handleSuccessufUserCreation(data);
        store.dispatch(signUpAction);
      })
      .catch((error) => {
        const errorAction = handleUserCreationError(error.message);
        store.dispatch(errorAction);
      });
  } else if (action.type === 'PATCH_PROFILE') {
    const { id } = store.getState().compartment;
    fetch(`http://localhost:3000/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: store.getState().user.email,
        password: store.getState().user.password,
        firstname: store.getState().user.firstname,
        lastname: store.getState().user.lastname,
        alias: store.getState().user.alias,
        avatar: store.getState().user.avatar,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de l'édition du profil");
        }
        return res.json();
      })
      .then((data) => {
        const editProfile = handleSuccessufProfileEdition(data);
        store.dispatch(editProfile);
      })
      .catch((error) => {
        const errorAction = handleProfileEditionError(error.message);
        store.dispatch(errorAction);
      });
  }

  return next(action);
};

export default authMiddleware;
