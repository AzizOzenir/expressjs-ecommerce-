import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../error_handler";
import { authMiddleWare } from "../middlewares/auth";
import { error } from "console";
import { getArcticles } from "../controllers/arcticle";
import { getUsers } from "../controllers/user";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category";

 const categoryRoutes: Router = Router();

categoryRoutes.get("/categories",[/* authMiddleWare */], errorHandler(getCategories) as any);

categoryRoutes.get("/categories/:id",[/* authMiddleWare */], errorHandler(getCategories) as any);
categoryRoutes.delete("/categories/:id",[/* authMiddleWare */], errorHandler(deleteCategory) as any);
categoryRoutes.put("/categories/:id",[/* authMiddleWare */], errorHandler(updateCategory) as any);
categoryRoutes.put("/categories",[/* authMiddleWare */], errorHandler(createCategory) as any);

export default categoryRoutes