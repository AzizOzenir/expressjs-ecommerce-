import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../error_handler";
import { authMiddleWare } from "../middlewares/auth";
import { error } from "console";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signup) as any);
authRoutes.post("/login", errorHandler(login) as any);
authRoutes.get("/me", [authMiddleWare as any], errorHandler(me) as any);
export default authRoutes;
