'use client';

import { configureStore } from '@reduxjs/toolkit';
import { apiData } from './features/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const makeStore = configureStore({
  reducer: {
    [apiData.reducerPath]: apiData.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiData.middleware),
});

setupListeners(makeStore.dispatch);
