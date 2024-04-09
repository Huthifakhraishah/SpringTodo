import { Request, Response } from "express";
import * as TaskModel from "../models/task";
import { handleError } from "../utils/handleError";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasks = await TaskModel.getAllTasks(id);
    res.json(tasks);
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    res.status(500).send(errorMessage);
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.getTaskById(Number(id));
    if (task) {
      res.json(task);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    res.status(500).send(errorMessage);
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.createTask(req.body);
    res.status(201).json(task);
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    res.status(500).send(errorMessage);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTask = await TaskModel.updateTask(Number(id), req.body);
    res.json(updatedTask);
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    res.status(500).send(errorMessage);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await TaskModel.deleteTask(Number(id));
    res.status(204).send();
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    res.status(500).send(errorMessage);
  }
};
