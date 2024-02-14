import { GetPlace } from './placeSlice';

const storyMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case 'FETCH_PLACE': {
            console.log('Déclencher l\'appel API pour récupérer une place');
            console.log(store.getState().place);

            // Utilisation du type d'action correct
            fetch('http://localhost:3000/places/{id}')
                .then((res) => res.json())
                .then((data) => {
                    const getPlaceAction = GetPlace(data);
                    store.dispatch(getPlaceAction);
                    console.log(data);
                });
            break;
        }
        case 'FETCH_STORIES': {
            console.log('Déclencher l\'appel API pour récupérer des histoires');

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
