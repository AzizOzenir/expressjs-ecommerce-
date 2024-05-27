import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../error_handler";
import { authMiddleWare } from "../middlewares/auth";
import { error } from "console";
import { getArcticles } from "../controllers/arcticle";
import { getUsers } from "../controllers/user";

 const userRoutes: Router = Router();

userRoutes.get("/users",[/* authMiddleWare */], errorHandler(getUsers) as any);

export default userRoutes