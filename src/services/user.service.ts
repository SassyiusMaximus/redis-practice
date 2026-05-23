import { User } from "../types/user.types";

let nextId = 1;
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
      id: String(nextId++),
      username: data.username,
      password: data.password,
    };
    users.push(newUser);
    return newUser;
  },
};