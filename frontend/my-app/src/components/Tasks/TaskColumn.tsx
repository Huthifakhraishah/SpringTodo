import React from "react";
import { useDrop } from "react-dnd";
import { Paper, Typography, Box } from "@mui/material";
import TaskCard from "./TaskCard";
import { Task } from "../../types/index";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  onDrop,
  onDelete,
  onEdit,
}) => {
  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => onDrop(item.id, title),
  }));

  return (
    <Box
      ref={drop}
      sx={{
        width: "100%",
        minHeight: 300,
        padding: 1,
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          marginBottom: 2,
          backgroundColor: "#beb8b8",
          padding: 1,
          borderRadius: 1,
          color: "black !important",
        }}
      >
        {title}
      </Typography>
      {tasks.length ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => onDelete(task.id)}
            onEdit={() => onEdit(task)}
          />
        ))
      ) : (
        <Typography align="center" color="text.secondary">
          No tasks
        </Typography>
      )}
    </Box>
  );
};

export default TaskColumn;
