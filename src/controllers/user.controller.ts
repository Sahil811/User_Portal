import { NextFunction, Request, Response } from 'express';
import { deleteUser, findAllUsers } from '../services/user.service';
import { User } from '../entities/user.entity';

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userRef;

    // Delete the user
    await deleteUser(userId);

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const getUserDetailsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get user details without password
    const userDetails = res.locals.user;

    res.status(200).json({
      status: 'success',
      data: {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const listUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // List all users without passwords
    const users = await findAllUsers();

    res.status(200).json({
      status: 'success',
      data: users.map((user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })),
    });
  } catch (err: unknown) {
    next(err);
  }
};
