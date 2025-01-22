import { configureStore } from "@reduxjs/toolkit/react";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import middleware from "./middleware";
import { authApi } from "./service/auth";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});

setupListeners(store.dispatch);

export default store;
