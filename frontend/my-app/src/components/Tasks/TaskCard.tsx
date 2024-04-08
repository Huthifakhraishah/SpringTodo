import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useDrag } from "react-dnd";
import { Task, TaskStatus } from "../../types/index";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: () => void;
}

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.Todo:
      return "rgba(255, 193, 7, 0.2)"; // Amber with transparency
    case TaskStatus.InProgress:
      return "rgba(33, 150, 243, 0.2)"; // Blue with transparency
    case TaskStatus.Completed:
      return "rgba(76, 175, 80, 0.2)"; // Green with transparency
    default:
      return "#BDBDBD"; // Grey
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  const [, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
  }));

  return (
    <Card
      ref={drag}
      sx={{
        marginBottom: 2,
        position: "relative",
        backgroundColor: getStatusColor(task.status),
      }}
    >
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton size="small" onClick={() => onDelete(task.id)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <CardContent sx={{ minHeight: "80px" }}>
        <Typography variant="body2">{task.title}</Typography>
        <Typography color="text.secondary">{task.description}</Typography>
      </CardContent>
      <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
        <IconButton size="small" onClick={onEdit}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default TaskCard;
