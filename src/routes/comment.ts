import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../error_handler";
import { authMiddleWare } from "../middlewares/auth";
import { error } from "console";
import { createComment, deleteComment, getComment, getComments, updateComment } from "../controllers/comment";

 const commentRoutes: Router = Router();

commentRoutes.get("/comments",[/* authMiddleWare */], errorHandler(getComments) as any);
commentRoutes.get("/comments/:id",[/* authMiddleWare */], errorHandler(getComment) as any);
commentRoutes.delete("/comments/:id",[/* authMiddleWare */], errorHandler(deleteComment) as any);
commentRoutes.put("/comments/:id",[/* authMiddleWare */], errorHandler(updateComment) as any);
commentRoutes.put("/comments",[/* authMiddleWare */], errorHandler(createComment) as any);

export default commentRoutes