import { RequestHandler } from "express";
import { userService } from "../services/user.service";
import { cacheService } from "../services/cache.service";
import { LoginBody, RegisterBody } from "../types/user.types";

export const registerUser: RequestHandler<{}, {}, RegisterBody> = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await userService.findByUsername(username);
    if (existingUser) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }
    const user = await userService.createUser({ username, password });
    res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const loginUser: RequestHandler<{}, {}, LoginBody> = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userService.findByUsername(username);
    if (!user || user.password !== password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const getUserById: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  try {
    // check Redis first
    const cachedUser = await cacheService.getUser(id);
    if (cachedUser) {
      console.log(`Cache HIT for user:${id}`);
      res.status(200).json({ source: "cache", user: cachedUser });
      return;
    }

    // miss — go to DB
    console.log(`Cache MISS for user:${id} — fetching from DB`);
    const user = await userService.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // save to Redis for next time
    await cacheService.setUser(user);
    res.status(200).json({ source: "database", user });
  } catch (error) {
    console.error("GetUserById error:", error);
    res.status(500).json({ message: "Server error" });
  }
};