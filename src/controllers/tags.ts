import { Request, Response } from "express";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await prismaClient.tag.findMany();
    res.json({ tags });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const getTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tag = await prismaClient.tag.findUnique({
      where: { id: parseInt(id) },
    });
    res.json({ tag });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const tag = await prismaClient.tag.create({ data: { name } });
    res.json({ tag });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const updateTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const tag = await prismaClient.tag.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json({ tag });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaClient.tag.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
