import { configureStore } from '@reduxjs/toolkit';
import billReducer from './billSlice';

export const store = configureStore({
  reducer: {
    bills: billReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;