import { Router } from "express";
import authRoutes from "./auth";
import arcticleRoutes from "./arcticle";
import usersRoutes from "./user";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use( arcticleRoutes);
rootRouter.use( usersRoutes);

export default rootRouter