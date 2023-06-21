import api from "./api.service";
import { Role } from "src/enums/role.enum";

export async function register({
  firstName,
  lastName,
  email,
  password,
  profileImage,
  role,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
  role?: Role.USER;
}): Promise<any> {
  try {
    const response = await api.post("/register", {
      email,
      password,
      firstName,
      lastName,
      profileImage,
      role,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any> {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default {
  register,
  login,
};
