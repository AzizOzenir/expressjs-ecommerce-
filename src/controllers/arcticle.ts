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

export const getArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const article = await prismaClient.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
        category: true,
        tags: true,
        comments: true,
      },
    });
    res.json({ article });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const createArticle = async (req: Request, res: Response) => {
  const { title, content, authorId, categoryId, tagIds } = req.body;
  try {
    const article = await prismaClient.article.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
        category: { connect: { id: categoryId } },
        tags: { connect: tagIds.map((id: number) => ({ id })) },
      },
    });
    res.json({ article });
  } catch (error) {
    console.log(error,"xxxxxxxxxxxx")
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, authorId, categoryId, tagIds } = req.body;
  try {
    const article = await prismaClient.article.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
        category: { connect: { id: categoryId } },
        tags: { set: [], connect: tagIds.map((id: number) => ({ id })) },
      },
    });
    res.json({ article });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaClient.article.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
