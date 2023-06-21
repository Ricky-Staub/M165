import { Request, Response } from "express";

import * as todoService from "../services/todo.service";

export async function getAllTodos(req: Request, res: Response): Promise<void> {
  try {
    const todos = await todoService.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getTodoById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const todo = await todoService.getTodoById(id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createTodo(req: Request, res: Response): Promise<void> {
  const { token } = req.headers;
  const todo = req.body;
  try {
    const createdTodo = await todoService.createTodo(todo, String(token));
    res.status(201).json(createdTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateTodoById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const { token } = req.headers;
  const todo = req.body;
  try {
    const updatedTodo = await todoService.updateTodoById(todo, String(token));
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteTodoById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const { token } = req.headers;
  try {
    await todoService.deleteTodoById(id, String(token));
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export default {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
};
