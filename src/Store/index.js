import { configureStore } from "@reduxjs/toolkit";
import userSlice from './UserSlice';
import authMiddleware from './authMiddleware';


const store = configureStore({
    reducer: {
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(

            authMiddleware,

        ),
});


export default store;
