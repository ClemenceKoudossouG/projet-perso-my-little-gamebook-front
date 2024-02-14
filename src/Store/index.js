import { configureStore } from '@reduxjs/toolkit';
import userSlice from './UserSlice';
import authMiddleware from './authMiddleware';
import placeSlice from './placeSlice';
import storyMiddleware from './storyMiddleware';

const store = configureStore({
    reducer: {
        user: userSlice,
        place: placeSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware, storyMiddleware),
});

export default store;
