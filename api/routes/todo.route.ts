import express from "express";

import todoController from "../controllers/todo.controller";

const router = express.Router();

router.get("/", todoController.getAllTodos);

router.get("/:id", todoController.getTodoById);

router.post("/create", todoController.createTodo);

router.put("/:id", todoController.updateTodoById);

router.delete("/:id", todoController.deleteTodoById);

export default router;
