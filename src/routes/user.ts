import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../error_handler";
import { authMiddleWare } from "../middlewares/auth";
import { error } from "console";
import { getArcticles } from "../controllers/arcticle";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user";

 const userRoutes: Router = Router();

userRoutes.get("/users",[/* authMiddleWare */], errorHandler(getUsers) as any);
userRoutes.get("/users/:id",[/* authMiddleWare */], errorHandler(getUser) as any);
userRoutes.delete("/users/:id",[/* authMiddleWare */], errorHandler(deleteUser) as any);
userRoutes.put("/users/:id",[/* authMiddleWare */], errorHandler(updateUser) as any);

export default userRoutes