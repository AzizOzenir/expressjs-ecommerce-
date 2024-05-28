import { Request, Response } from "express";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prismaClient.category.findMany();
    res.json({ categories });
  } catch (error) {
     throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await prismaClient.category.findUnique({ where: { id: parseInt(id) } });
    res.json({ category });
  } catch (error) {
     throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await prismaClient.category.create({ data: { name } });
    res.json({ category });
  } catch (error) {
     throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await prismaClient.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json({ category });
  } catch (error) {
     throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaClient.category.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
     throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};