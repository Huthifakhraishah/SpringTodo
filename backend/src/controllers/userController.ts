import { Request, Response } from "express";
import * as UserModel from "../models/user";

export const signupUser = async (req: Request, res: Response) => {
  const { email, auth0Id } = req.body;

  try {
    const user = await UserModel.findOrCreateUserByAuth0Id(email, auth0Id);
    res.status(201).json(user);
  } catch (error) {
    console.error("User signup failed:", error);
    res.status(500).send("Internal server error");
  }
};
