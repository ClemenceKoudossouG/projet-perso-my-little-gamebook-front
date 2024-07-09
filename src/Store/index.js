import { configureStore } from '@reduxjs/toolkit';
import userSlice from './UserSlice';
import authMiddleware from './authMiddleware';
import compartmentSlice from './compartmentSlice';
import storyMiddleware from './storyMiddleware';
import StoriesSlice from './StoriesSlice';
import NotificationSlice from './notificationSlice';
import contactPageSlice from './contactPageSlice';
import contactPageMiddleware from './contactPageMiddleware';

const store = configureStore({
  reducer: {
    user: userSlice,
    compartment: compartmentSlice,
    stories: StoriesSlice,
    notification: NotificationSlice,
    contactPage: contactPageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authMiddleware,
      storyMiddleware,
      contactPageMiddleware
    ),
});

export default store;
