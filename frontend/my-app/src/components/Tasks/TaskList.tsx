import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import TaskColumn from "./TaskColumn";
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../features/tasks/tasksApi";
import { Task, TaskStatus } from "../../types";

const taskColumns = [
  { title: "Todo", status: TaskStatus.Todo },
  { title: "In Progress", status: TaskStatus.InProgress },
  { title: "Completed", status: TaskStatus.Completed },
];
interface TaskListProps {
  tasks: Task[];
  onEdit: any;
  onDrop?: any;
  onDelete?: any;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDrop,
  onDelete,
}) => {
  return (
    <Grid container spacing={2}>
      {taskColumns.map((column) => (
        <Grid item xs={12} sm={6} md={4} key={column.status}>
          <TaskColumn
            onDelete={onDelete}
            onEdit={onEdit}
            title={column.title}
            tasks={tasks.filter((task) => task.status === column.status)}
            onDrop={(task) => onDrop(task, column.status)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
