import { GetCompartment } from './compartmentSlice';

const storyMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case 'FETCH_COMPARTMENT': {
            console.log("Déclencher l'appel API pour récupérer le compartment");
            const { id } = store.getState().compartment;
            console.log(id);
            // Utilisation du type d'action correct
            fetch(`http://localhost:3000//compartments/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    const GetCompartmentAction = GetCompartment(data);
                    store.dispatch(GetCompartmentAction);
                    console.log(`c'est le console log après appel api ${data}`);
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
