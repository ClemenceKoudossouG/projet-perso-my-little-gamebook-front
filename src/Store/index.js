import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userSlice from './UserSlice';
import authMiddleware from './authMiddleware';
import compartmentSlice from './compartmentSlice';
import storyMiddleware from './storyMiddleware';
import StoriesSlice from './StoriesSlice';
import NotificationSlice from './notificationSlice';
import contactPageSlice from './contactPageSlice';
import contactPageMiddleware from './contactPageMiddleware';

const rootReducer = combineReducers({
  user: userSlice,
  compartment: compartmentSlice,
  stories: StoriesSlice,
  notification: NotificationSlice,
  contactPage: contactPageSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'compartment', 'stories'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware, storyMiddleware, contactPageMiddleware),
});

export const persistor = persistStore(store);

export default store;
