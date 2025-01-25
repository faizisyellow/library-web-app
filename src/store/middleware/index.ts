import { authApi } from "../service/auth";
import { booksApi } from "../service/books";
import { borrowingApi } from "../service/borrowing";
import { categoriesApi } from "../service/categories";
import { dashboardOverviewApi } from "../service/dashboard";
import { profileApi } from "../service/profile";
import { userApi } from "../service/users";

const middleware = [authApi.middleware, booksApi.middleware, categoriesApi.middleware, borrowingApi.middleware, dashboardOverviewApi.middleware, profileApi.middleware,userApi.middleware];

export default middleware;
