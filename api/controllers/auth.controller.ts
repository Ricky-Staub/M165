import { Request, Response } from "express";

import authService from "../services/auth.service";
import { Role } from "src/enums/role.enum";

const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, profileImage } = req.body;

  try {
    const result = await authService.register(
      firstName,
      lastName,
      email,
      password,
      profileImage,
      Role.USER
    );
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send("Failed to register user!");
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.login({ email, password });
    res.send(result);
  } catch (error) {
    res.status(401).send("Wrong email or password!");
  }
};

export default {
  register,
  login,
};
