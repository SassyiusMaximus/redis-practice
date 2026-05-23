import redisClient from "../config/redis";
import { User } from "../types/user.types";

const USER_TTL = 28800; // cache expires after 8 hours

export const cacheService = {
  // Save a user to Redis by their ID
  setUser: async (user: User): Promise<void> => {
    await redisClient.setEx(
      `user:${user.id}`,
      USER_TTL,
      JSON.stringify(user)
    );
  },

  // Try to get a user from Redis by ID
  getUser: async (id: string): Promise<User | null> => {
    const cached = await redisClient.get(`user:${id}`);
    if (!cached) return null;
    return JSON.parse(cached) as User;
  },

  // Remove a user from cache (useful if user data changes)
  deleteUser: async (id: string): Promise<void> => {
    await redisClient.del(`user:${id}`);
  },
};