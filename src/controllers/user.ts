import { Request, Response } from "express";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not_found";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prismaClient.user.findMany({});

    res.json({ users });
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (user) {
      res.json({ user });
    } else {
      throw new NotFoundException("User Not Found", ErrorCode.USER_NOT_FOUND);
    }
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    const user = await prismaClient.user.update({
      where: { id: parseInt(id, 10) },
      data: { name, email, password, role },
    });
    res.json(user);
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};




export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaClient.user.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).end();
  } catch (error) {
    throw new BadRequestException(
      "Something went Wrong",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};