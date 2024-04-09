import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "../tasks/tasksApi";

interface User {
  id: string;
  email: string;
  auth0Id?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  prepareHeaders: prepareHeaders,
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchUserProfile: builder.query<User, void>({
      query: () => "/users/profile",
      providesTags: ["User"],
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "/users/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useFetchUserProfileQuery, useCreateUserMutation } = authApi;
