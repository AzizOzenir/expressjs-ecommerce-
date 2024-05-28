import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../error_handler";
import { authMiddleWare } from "../middlewares/auth";
import { error } from "console";
import { createArticle, deleteArticle, getArcticles, getArticle, updateArticle } from "../controllers/arcticle";

 const arcticleRoutes: Router = Router();

arcticleRoutes.get("/arcticles",[/* authMiddleWare */], errorHandler(getArcticles) as any);
arcticleRoutes.get("/arcticles/:id",[/* authMiddleWare */], errorHandler(getArticle) as any);
arcticleRoutes.delete("/arcticles/:id",[/* authMiddleWare */], errorHandler(deleteArticle) as any);
arcticleRoutes.put("/arcticles/:id",[/* authMiddleWare */], errorHandler(updateArticle) as any);
arcticleRoutes.put("/arcticles",[/* authMiddleWare */], errorHandler(createArticle) as any);

export default arcticleRoutes