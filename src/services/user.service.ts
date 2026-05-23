import { User } from "../types/user.types";
import { v4 as uuidv4 } from "uuid";

const users: User[] = [];

export const userService = {
  findByUsername: async (username: string): Promise<User | null> => {
    return users.find((u) => u.username === username) || null;
  },

  findById: async (id: string): Promise<User | null> => {
    return users.find((u) => u.id === id) || null;
  },

  createUser: async (data: { username: string; password: string }): Promise<User> => {
    const newUser: User = {
      id: uuidv4(),
      username: data.username,
      password: data.password,
      isSuperAdmin: false,
    };
    users.push(newUser);
    return newUser;
  },
};