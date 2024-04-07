import { PrismaClient } from "@prisma/client";
import { Task } from "../routes/types";
const prisma = new PrismaClient();

// Fetch all tasks
export const getAllTasks = async () => {
  return await prisma.task.findMany();
};

// Fetch a single task by ID
export const getTaskById = async (id: number) => {
  return await prisma.task.findUnique({
    where: { id },
  });
};

// Create a new task
export const createTask = async (taskData: Task) => {
  return await prisma.task.create({
    data: taskData,
  });
};

// Update an existing task
export const updateTask = async (id: number, taskData: Task) => {
  return await prisma.task.update({
    where: { id },
    data: taskData,
  });
};

// Delete a task
export const deleteTask = async (id: number) => {
  return await prisma.task.delete({
    where: { id },
  });
};
