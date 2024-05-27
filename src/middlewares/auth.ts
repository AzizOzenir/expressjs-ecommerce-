import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unatuhorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { User } from "@prisma/client";

// it should be used here tbh. I used it bcause  compiler is not able to find it in d.ts file
declare module "express" {
  interface Request {
    user?: User |null;
  }
}

export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    console.log("token",token)

    if (!token) {
      next(new UnauthorizedException("Unauthorized Token yok", ErrorCode.UNAUTHORIZED));
    }
    const payload = jwt.verify(token!, JWT_SECRET) as any;

    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      next(new UnauthorizedException("Unauthorized User yok", ErrorCode.UNAUTHORIZED));
    }

    req.user = user 
  } catch (error) {
    next(new UnauthorizedException(`Unauthorized Başka bi hata,${error}`, ErrorCode.UNAUTHORIZED));
  }
  
};
