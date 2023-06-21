import api from "./api.service";
import { TodoType } from "src/types/todo.type";

export async function getAllTodos(): Promise<any> {
  try {
    const response = await api.get("/todos");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return Promise.reject(error);
  }
}

export async function getTodoById(id: string): Promise<any> {
  try {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createTodo(data: TodoType): Promise<any> {
  try {
    const response = await api.post("/todos", data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateTodoById(data: TodoType): Promise<any> {
  try {
    const response = await api.put(`/todos/${data.id}`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteTodoById(id: string): Promise<void> {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
}

export default {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
};
