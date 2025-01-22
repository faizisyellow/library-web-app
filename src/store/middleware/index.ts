import { authApi } from "../service/auth";

const middleware = [authApi.middleware];

export default middleware;
