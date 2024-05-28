import { Router } from "express";
import authRoutes from "./auth";
import arcticleRoutes from "./arcticle";
import usersRoutes from "./user";
import categoryRoutes from "./category";
import tagRoutes from "./tag";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use( arcticleRoutes);
rootRouter.use( categoryRoutes);
rootRouter.use( usersRoutes);
rootRouter.use( tagRoutes);


export default rootRouter