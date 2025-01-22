import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const defaultBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1/",
  credentials: "include",
});

export default defaultBaseQuery;
