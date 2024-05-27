import { Request, Response } from "express";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prismaClient.user.findMany({
    
    });

    res.json({ users });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
