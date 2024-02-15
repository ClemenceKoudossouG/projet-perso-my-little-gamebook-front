import { configureStore } from '@reduxjs/toolkit';
import userSlice from './UserSlice';
import authMiddleware from './authMiddleware';
import compartmentSlice from './compartmentSlice';
import storyMiddleware from './storyMiddleware';

const store = configureStore({
    reducer: {
        user: userSlice,
        compartment: compartmentSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware, storyMiddleware),
});

export default store;
