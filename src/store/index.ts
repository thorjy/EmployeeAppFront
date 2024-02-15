import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import { employeeApi } from '../services/employeeApi'
import pageReducer from "../features/pageSlice"

const store = configureStore({
    reducer: {
            [employeeApi.reducerPath]: employeeApi.reducer,
            page: pageReducer,
          },
          middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(employeeApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
