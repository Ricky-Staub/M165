import { Request, Response } from "express";

import * as userService from "../services/user.service";

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateUserById(
  req: Request,
  res: Response
): Promise<void> {
  const user = req.body;
  try {
    const updatedUser = await userService.updateUserById(user);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateProfileImageById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const { img } = req.body;
  try {
    const updatedUser = await userService.updateProfileImageById(id, img);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteUserById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  try {
    await userService.deleteUserById(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export default {
  getAllUsers,
  getUserById,
  updateUserById,
  updateProfileImageById,
  deleteUserById,
};
