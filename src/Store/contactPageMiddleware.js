import { handleSuccessfulContact, contactError } from './contactPageSlice';

const contactPageMiddleware = (store) => (next) => (action) => {
  if (action.type === 'SUBMIT_CONTACT') {
    fetch('http://localhost:3000/contactEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: store.getState().contactPage.email,
        name: store.getState().contactPage.name,
        message: store.getState().contactPage.message,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Oups ! Le message n'a pas pu être envoyé.");
        }
        return res.json();
      })
      .then((data) => {
        store.dispatch(handleSuccessfulContact(data));
      })
      .catch((error) => {
        const errorAction = contactError(error.message);
        // console.log(error);
        store.dispatch(errorAction);
      });
  }
  return next(action);
};

export default contactPageMiddleware;
