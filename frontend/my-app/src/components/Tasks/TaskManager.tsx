import React, { useState } from "react";
import { Task, TaskStatus } from "../../types/index";
import TaskEditModal from "../Tasks/TaskEditModal";
import { TaskList } from "../Tasks/TaskList";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TaskManager: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleOpenCreateModal = () => {
    setCurrentTask(undefined);
    setOpenModal(true);
  };

  const handleSaveTask = (savedTask: Task) => {
    if (currentTask) {
      setTasks((prev) =>
        prev.map((task) => (task.id === savedTask.id ? savedTask : task))
      );
    } else {
      setTasks((prev) => [
        ...prev,
        { ...savedTask, id: Date.now().toString() },
      ]);
    }
    setOpenModal(false);
  };

  const handleEditModalOpen = (task: Task) => {
    setCurrentTask(task);
    setOpenModal(true);
  };

  const handleDrop = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <>
      <TaskList
        tasks={tasks}
        onEdit={handleEditModalOpen}
        onDrop={handleDrop}
        onDelete={handleDeleteTask}
      />
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
