import redisClient from "../config/redis";
import { User } from "../types/user.types";

const USER_TTL = 28800; // cache expires after 8 hours

export const cacheService = {
  // save a user to Redis by their ID
  setUser: async (user: User): Promise<void> => {
    await redisClient.setEx( 
      `user:${user.id}`, //user key (user:1)
      USER_TTL,
      JSON.stringify(user)
    );
  },

  // try to get a user from Redis by ID
  getUser: async (id: string): Promise<User | null> => {
    const cached = await redisClient.get(`user:${id}`);
    if (!cached) return null;
    return JSON.parse(cached) as User;
  },

};