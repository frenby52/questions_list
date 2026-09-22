import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filtersSlice.ts';
import { questionsApi } from './services/questionsApi.ts';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(questionsApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
