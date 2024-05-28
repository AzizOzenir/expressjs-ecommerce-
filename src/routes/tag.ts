import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../error_handler";
import { authMiddleWare } from "../middlewares/auth";
import { error } from "console";
import { createTag, deleteTag, getTag, getTags, updateTag } from "../controllers/tags";
import { getArticle } from "../controllers/arcticle";

 const tagRoutes: Router = Router();

tagRoutes.get("/tags",[/* authMiddleWare */], errorHandler(getTags) as any);
tagRoutes.get("/tags/:id",[/* authMiddleWare */], errorHandler(getTag) as any);
tagRoutes.delete("/tags/:id",[/* authMiddleWare */], errorHandler(deleteTag) as any);
tagRoutes.put("/tags/:id",[/* authMiddleWare */], errorHandler(updateTag) as any);
tagRoutes.put("/tags",[/* authMiddleWare */], errorHandler(createTag) as any);

export default tagRoutes