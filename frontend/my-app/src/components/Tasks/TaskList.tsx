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
  //   const { data: tasks, isLoading, error } = useGetTasksQuery();
  // const [updateTask] = useUpdateTaskMutation();

  // const handleDrop = (task: Task, newStatus: TaskStatus) => {
  //   updateTask({ id: task.id, data: { ...task, status: newStatus } });
  // };

  //   if (error)
  //     return (
  //       <Typography variant="h6" color="error" textAlign="center">
  //         Error fetching tasks
  //       </Typography>
  //     );

  //   if (isLoading || !tasks?.length)
  //     return (
  //       <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: "center" }}>
  //         <Typography variant="h6">
  //           No tasks found. Start by adding a new task!
  //         </Typography>
  //       </Paper>
  //     );

  return (
    <Grid container spacing={2}>
      {taskColumns.map((column) => (
        <Grid item xs={12} sm={6} md={4} key={column.status}>
          <TaskColumn
            onDelete={onDelete}
            onEdit={onEdit}
            title={column.title}
            tasks={tasks.filter((task) => task.status === column.status)}
            // tasks={tasks?.filter((task) => task.status === column.status) || []}
            onDrop={(task) => onDrop(task, column.status)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
