import { Router } from "express";
import { registerUser, loginUser, getUserById } from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/:id", getUserById);

export default router;