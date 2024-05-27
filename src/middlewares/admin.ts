import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { User } from "@prisma/client";
import { UnauthorizedException } from "./../exceptions/unatuhorized";

// it should be used here tbh. I used it bcause  compiler is not able to find it in d.ts file
declare module "express" {
  interface Request {
    user?: User | null;
  }
}

export const adminMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user?.role == "ADMIN") {
    next();
  } else {
    next(
      new UnauthorizedException("Unauthorized as Admin", ErrorCode.UNAUTHORIZED)
    );
  }
};
