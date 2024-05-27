import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../error_handler";
import { authMiddleWare } from "../middlewares/auth";
import { error } from "console";
import { getArcticles } from "../controllers/arcticle";

 const arcticleRoutes: Router = Router();

arcticleRoutes.get("/arcticles",[/* authMiddleWare */], errorHandler(getArcticles) as any);

export default arcticleRoutes