import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { signupSchema } from "./schema/users";
import { authMiddleWare } from "./middlewares/auth";

const app: Express = express();

export const prismaClient = new PrismaClient({
  log: ["query"],
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
/* app.use(authMiddleWare);   */
app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`listening app on ${PORT}`);
});

