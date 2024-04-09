import React, { useEffect, useState } from "react";
import { Task, TaskStatus } from "../../types/index";
import TaskEditModal from "../Tasks/TaskEditModal";
import { TaskList } from "../Tasks/TaskList";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../features/tasks/tasksApi";
import { useAuth0 } from "@auth0/auth0-react";

const TaskManager: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const userId = localStorage.getItem("userId") ?? "3";
  const { data: tasks, isLoading, error, refetch } = useGetTasksQuery(userId);

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleOpenCreateModal = () => {
    setCurrentTask(undefined);
    setOpenModal(true);
  };

  const handleSaveTask = async (task: Task) => {
    if (task.id) {
      await updateTask({ id: task.id, data: task }).unwrap();
    } else {
      await addTask(task).unwrap();
    }
    setOpenModal(false);
    refetch();
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setOpenModal(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId).unwrap();
    refetch();
  };

  useEffect(() => {
    if ((error as any)?.data?.messages === "No authorization token was found") {
      refetch(); // Refetch tasks once the token is confirmed to be present.
    }
  }, [error]);

  const handleDrop = (taskId: string, newStatus: TaskStatus) => {
    const task = tasks?.filter((task) => `${task.id}` === `${taskId}`)[0];
    updateTask({ id: taskId, data: { ...task, status: newStatus } });
  };

  return (
    <>
      {error ? (
        <div>Error fetching tasks</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <TaskList
          tasks={tasks || []}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onDrop={handleDrop}
        />
      )}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleOpenCreateModal}
      >
        <AddIcon />
      </Fab>
      {openModal && (
        <TaskEditModal
          task={currentTask}
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSaveTask}
        />
      )}
    </>
  );
};

export default TaskManager;
