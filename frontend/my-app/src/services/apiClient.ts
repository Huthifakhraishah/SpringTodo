import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN PROGRESS" | "COMPLETED";
  deadline: string;
}

const baseUrl = "http://localhost:3001";

export const apiClient = createApi({
  reducerPath: "apiClient",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => `/tasks`,
      providesTags: ["Task"],
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: `/tasks`,
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Task", id }],
    }),
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Task", id }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiClient;
