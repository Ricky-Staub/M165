import { UserType } from "src/types/user.type";
import api from "./api.service";

export async function getAllUsers(): Promise<UserType[]> {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getUserById(id: string): Promise<UserType> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateUserById(user: any): Promise<UserType> {
  try {
    const { id, ...userData } = user;
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateProfileImageById(
  id: string,
  img: string
): Promise<UserType> {
  try {
    const response = await api.patch(`/users/profile-image/${id}`, { img });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteUserById(id: string): Promise<void> {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
}

export default {
  getAllUsers,
  getUserById,
  updateUserById,
  updateProfileImageById,
  deleteUserById,
};
