import { Request, Response } from "express";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";

export const getArcticles = async (req: Request, res: Response) => {
  try {
    const articles = await prismaClient.article.findMany({
      include: {
        author: true,
        category: true,
        tags: true,
        comments: true,
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
