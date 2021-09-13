import express from "express";
import { login, register, logout, getAuth } from "../controllers/auth.js";
import passport from "passport";

const router = express.Router();

router.get("/", getAuth);
router.post("/login", login);
router.post("/register", register);
router.delete("/logout", logout);

export default router;
