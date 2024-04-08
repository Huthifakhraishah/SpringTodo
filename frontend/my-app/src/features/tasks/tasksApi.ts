import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../../types";

const baseUrl =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/api";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
