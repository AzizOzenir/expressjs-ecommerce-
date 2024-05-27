import { Request, Response } from "express";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const articles = await prismaClient.category.findMany({
      include: {
        
      },
    });

    res.json({ articles });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
