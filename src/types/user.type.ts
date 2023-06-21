import { RoleType } from "./role.type";

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
  roles: RoleType[];
};

export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type SessionType = {
  user: UserType;
  accessToken: string | null;
  isAuthenticated?: boolean;
};
