import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  styled,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Task, TaskStatus } from "../../types/index";

interface TaskEditModalProps {
  task: Task | undefined;
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const DialogTitleCentered = styled(DialogTitle)({
  textAlign: "center",
});

const TaskEditModal: React.FC<TaskEditModalProps> = ({
  task,
  open,
  onClose,
  onSave,
}) => {
  const { control, handleSubmit, reset } = useForm<Task>({
    defaultValues: task || {
      title: "",
      description: "",
      deadline: new Date().toISOString().substring(0, 16),
      status: TaskStatus.Todo,
    },
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    reset(task);
  }, [task, reset]);

  const onSubmit = (data: Task) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitleCentered>
          {task ? "Edit Task" : "Create Task"}
        </DialogTitleCentered>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  label="Title"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Description"
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Deadline"
                  margin="dense"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              )}
            />
            <Box display="flex" justifyContent="center">
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ToggleButtonGroup
                    value={value}
                    exclusive
                    orientation={fullScreen ? "vertical" : "horizontal"}
                    onChange={(event, newStatus) => onChange(newStatus)}
                    aria-label="task status"
                    sx={{
                      "& .MuiToggleButton-root": {
                        width: fullScreen ? "90vw" : "150px",
                        border: "1px solid black",
                        "&.Mui-selected": {
                          backgroundColor: "transparent",
                          color: "black",
                        },
                      },
                    }}
                  >
                    <ToggleButton
                      value={TaskStatus.Todo}
                      style={{
                        backgroundColor:
                          TaskStatus.Todo === value
                            ? "rgba(255, 193, 7, 0.2)"
                            : "",
                        margin: 1,
                      }}
                    >
                      Todo
                    </ToggleButton>
                    <ToggleButton
                      value={TaskStatus.InProgress}
                      style={{
                        backgroundColor:
                          TaskStatus.InProgress === value
                            ? "rgba(33, 150, 243, 0.2)"
                            : "",
                        margin: 1,
                      }}
                    >
                      In Progress
                    </ToggleButton>
                    <ToggleButton
                      value={TaskStatus.Completed}
                      style={{
                        backgroundColor:
                          TaskStatus.Completed === value
                            ? "rgba(76, 175, 80, 0.2)"
                            : "",
                        margin: 1,
                      }}
                    >
                      Completed
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskEditModal;
