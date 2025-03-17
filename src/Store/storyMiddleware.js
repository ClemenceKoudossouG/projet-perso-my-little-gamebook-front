import { getAllStories } from './StoriesSlice';
import { loadCompartment } from './compartmentSlice';

const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || 'http://localhost:3000';

// Helper function to handle API requests
const fetchData = async (url, token, dispatch, actionType) => {
  try {
    const response = await fetch(url, {
      headers: { Authorization: token },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    // Dispatch the appropriate action to update the state
    switch (actionType) {
      case 'FETCH_COMPARTMENT':
      case 'FETCH_COMPARTMENT_BEGINNING':
      case 'FETCH_ACCOUNTFREE_COMPARTMENT':
      case 'FETCH_ACCOUNTFREE_COMPARTMENT_BEGINNING':
        dispatch(loadCompartment(data));
        break;
      case 'FETCH_STORIES':
        dispatch(getAllStories(data));
        break;
      default:
        break;
    }
  } catch (error) {
    console.error('API request failed:', error);
  }
};

const storyMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'FETCH_COMPARTMENT': {
      console.log("Déclencher l'appel API pour récupérer le compartment");
      const { id } = store.getState().compartment;
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      fetchData(
        `${API_BASE_URL}/compartments/${id}`,
        token,
        store.dispatch,
        'FETCH_COMPARTMENT'
      );
      break;
    }

    case 'FETCH_COMPARTMENT_BEGINNING': {
      console.log(
        "Déclencher l'appel API pour récupérer le premier compartment"
      );
      const { id } = store.getState().compartment;
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      fetchData(
        `${API_BASE_URL}/compartments/story/${id}/beginning`,
        token,
        store.dispatch,
        'FETCH_COMPARTMENT_BEGINNING'
      );
      break;
    }

    case 'FETCH_ACCOUNTFREE_COMPARTMENT': {
      console.log(
        "Déclencher l'appel API pour récupérer le compartment, sans authentification"
      );
      const { id } = store.getState().compartment;
      fetchData(
        `${API_BASE_URL}/accountFreeStories/${id}`,
        null,
        store.dispatch,
        'FETCH_ACCOUNTFREE_COMPARTMENT'
      );
      break;
    }

    case 'FETCH_ACCOUNTFREE_COMPARTMENT_BEGINNING': {
      console.log(
        "Déclencher l'appel API pour récupérer le premier compartment, sans authentification"
      );
      fetchData(
        `${API_BASE_URL}/accountFreeStories/story/1/beginning`,
        null,
        store.dispatch,
        'FETCH_ACCOUNTFREE_COMPARTMENT_BEGINNING'
      );
      break;
    }

    case 'FETCH_STORIES': {
      console.log("Déclencher l'appel API pour récupérer des histoires");
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      fetchData(
        `${API_BASE_URL}/stories`,
        token,
        store.dispatch,
        'FETCH_STORIES'
      );
      break;
    }

    default:
      next(action);
  }
};

export default storyMiddleware;
