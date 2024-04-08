import React from "react";
import { useGetTasksQuery } from "../../services/apiClient";

export const TaskList: React.FC = () => {
  const { data: tasks, error, isLoading } = useGetTasksQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <ul>
      {tasks?.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
};
