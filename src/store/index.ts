import middleware from "./middleware";
import { configureStore } from "@reduxjs/toolkit/react";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApi } from "./service/auth";
import { booksApi } from "./service/books";
import { categoriesApi } from "./service/categories";
import { borrowingApi } from "./service/borrowing";
import { dashboardOverviewApi } from "./service/dashboard";
import { profileApi } from "./service/profile";
import { userApi } from "./service/users";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [borrowingApi.reducerPath]: borrowingApi.reducer,
    [dashboardOverviewApi.reducerPath]: dashboardOverviewApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [userApi.reducerPath]:userApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});

setupListeners(store.dispatch);

export default store;
