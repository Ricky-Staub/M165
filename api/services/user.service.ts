import { UserType } from "src/types/user.type";
import api from "./api.service";

export async function getAllUsers(): Promise<UserType[]> {
  return (await api.get("/users")).data;
}

export async function getUserById(id: string): Promise<UserType> {
  return (await api.get(`/users/${id}`)).data;
}

export async function createUser(data: UserType): Promise<UserType> {
  return (await api.post("/users", data)).data;
}

export async function updateUserById(data: UserType): Promise<UserType> {
  return (await api.put(`/users/${data.id}`, data)).data;
}

export async function updateProfileImageById(
  id: string,
  profileImage: string
): Promise<UserType> {
  return (await api.patch(`/users/profile-image/${id}`, { profileImage })).data;
}

export async function deleteUserById(id: string): Promise<void> {
  return (await api.delete(`/users/${id}`)).data;
}

export default {
  getAllUsers,
  getUserById,
  updateUserById,
  updateProfileImageById,
  deleteUserById,
};
