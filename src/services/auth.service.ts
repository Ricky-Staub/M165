import api from "./api.service";
import { Role } from "src/enums/role.enum";
import { LoginType, RegisterType, UserType } from "src/types/user.type";

async function register(data: RegisterType): Promise<UserType> {
  return (await api.post("/register", { ...data, role: Role.USER })).data;
}

async function login(data: LoginType): Promise<UserType> {
  const response = await api.post("/login", data);

  const accessToken = response.data.accessToken;
  localStorage.setItem("access_token", accessToken);

  return response.data;
}

async function logout(): Promise<void> {
  localStorage.removeItem("access_token");
}

export default {
  register,
  login,
  logout,
};
