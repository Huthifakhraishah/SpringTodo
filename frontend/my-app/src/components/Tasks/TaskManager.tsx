import React, { useState } from "react";
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

const TaskManager: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const { data: tasks, isLoading, error, refetch } = useGetTasksQuery();

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleOpenCreateModal = () => {
    setCurrentTask(undefined); // Prepare for creating a new task
    setOpenModal(true);
  };

  const handleSaveTask = async (task: Task) => {
    if (task.id) {
      await updateTask({ id: task.id, data: task }).unwrap();
    } else {
      await addTask(task).unwrap();
    }
    setOpenModal(false);
    refetch(); // Refetch tasks list to update UI
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task); // Set current task for editing
    setOpenModal(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId).unwrap();
    refetch(); // Refetch tasks list to update UI
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
