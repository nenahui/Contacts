import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from '../feautres/ContactForm/contactFormSlice';
import { homeReducer } from '../feautres/Home/homeSlice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
