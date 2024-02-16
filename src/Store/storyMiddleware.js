import { getCompartment, loadCompartment } from './compartmentSlice';

const storyMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'FETCH_COMPARTMENT': {
      console.log("Déclencher l'appel API pour récupérer le compartment");
      // On récupére l'id chargé dans le state dans le composant reviewStory.jsx (getCompartment)
      const { id } = store.getState().compartment;
      // On appel la route la route avec l'id provenant du state
      fetch(`http://localhost:3000/compartments/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // à voir selon retour back si obligatoire
          console.log(data);
          // on déclenche le reducer loadCompartment qui va charger les données du compartment dans le state (compartment).
          store.dispatch(loadCompartment(data));
        });
      break;
    }
    case 'FETCH_STORIES': {
      console.log("Déclencher l'appel API pour récupérer des histoires");

      // Utilisation du type d'action correct pour récupérer des histoires
      fetch('http://localhost:3000/stories')
        .then((res) => res.json())
        .then((data) => {
          // Traiter les données reçues si nécessaire
          console.log(data);
        });
      break;
    }
    default:
      // Si l'action n'est pas gérée, passez à l'action suivante dans le middleware
      return next(action);
  }
};

export default storyMiddleware;
