import api from "./api.service";
import { TodoType } from "src/types/todo.type";

export async function getAllTodos(): Promise<TodoType[]> {
  return (await api.get("/todos")).data;
}

export async function getTodoById(id: string): Promise<TodoType> {
  return (await api.get(`/todos/${id}`)).data;
}

export async function createTodo(data: TodoType): Promise<TodoType> {
  return (await api.post("/todos", data)).data;
}

export async function updateTodoById(data: TodoType): Promise<TodoType> {
  return (await api.put(`/todos/${data.id}`, data)).data;
}

export async function deleteTodoById(id: string): Promise<void> {
  return (await api.delete(`/todos/${id}`)).data;
}

export default {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
};
