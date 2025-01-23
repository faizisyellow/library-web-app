import { authApi } from "../service/auth";
import { booksApi } from "../service/books";
import { borrowingApi } from "../service/borrowing";
import { categoriesApi } from "../service/categories";
import { dashboardOverviewApi } from "../service/dashboard";

const middleware = [authApi.middleware, booksApi.middleware, categoriesApi.middleware, borrowingApi.middleware, dashboardOverviewApi.middleware];

export default middleware;
