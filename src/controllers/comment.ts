import { Request, Response } from "express";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await prismaClient.comment.findMany({
      include: {
        author: true,
        article: true,
      },
    });
    res.json({ comments });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const getComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await prismaClient.comment.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
        article: true,
      },
    });
    res.json({ comment });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const createComment = async (req: Request, res: Response) => {
  const { content, authorId, articleId } = req.body;
  try {
    const comment = await prismaClient.comment.create({
      data: {
        content,
        author: { connect: { id: authorId } },
        article: { connect: { id: articleId } },
      },
    });
    res.json({ comment });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, authorId, articleId } = req.body;
  try {
    const comment = await prismaClient.comment.update({
      where: { id: parseInt(id) },
      data: {
        content,
        author: { connect: { id: authorId } },
        article: { connect: { id: articleId } },
      },
    });
    res.json({ comment });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaClient.comment.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
