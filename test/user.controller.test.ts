import { Request, Response, NextFunction } from 'express';
import { getUserDetailsHandler, listUsersHandler, deleteUserHandler } from '../src/controllers/user.controller';
import * as userService from '../src/services/user.service'; // Import your user service methods
import { RoleEnumType, User } from '../src/entities/user.entity';

describe('User Route Handlers', () => {
  describe('deleteUserHandler', () => {
    it('should delete a user and return success response', async () => {
      const mockUserId = 'someUserId';

      const deleteSpy = jest.spyOn(userService, 'deleteUser').mockResolvedValue();
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      const mockRequest = { params: { userRef: mockUserId } } as unknown as Request;
      const mockNext = jest.fn() as NextFunction;

      await deleteUserHandler(mockRequest, mockResponse, mockNext);

      expect(deleteSpy).toHaveBeenCalledWith(mockUserId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'User deleted successfully',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with an error if deleteUser service throws an error', async () => {
      const mockUserId = 'someUserId';
      const mockError = new Error('Delete user failed');

      jest.spyOn(userService, 'deleteUser').mockRejectedValue(mockError);
      const mockResponse = { status: jest.fn(), json: jest.fn() } as unknown as Response;

      const mockRequest = { params: { userRef: mockUserId } } as unknown as Request;
      const mockNext = jest.fn() as NextFunction;

      await deleteUserHandler(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  // Tests for getUserDetailsHandler and listUsersHandler
  describe('getUserDetailsHandler', () => {
    it('should respond with user details without password', async () => {
      const mockUser = {
        id: 'someUserId',
        name: 'John Doe',
        email: 'john@example.com',
        role: RoleEnumType.USER,
      };

      const mockRequest = {} as Request;
      const mockResponse = {
        locals: {
          user: mockUser,
        },
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn() as NextFunction;

      await getUserDetailsHandler(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
        },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    // it('should call next with an error if an exception occurs', async () => {
    //   const mockError = new Error('Failed to get user details');

    //   const mockRequest = {} as Request;
    //   const mockResponse = {
    //     locals: {
    //       user: {
    //         id: 'someUserId',
    //         name: 'John Doe',
    //         email: 'john@example.com',
    //         role: 'user',
    //       },
    //     },
    //   } as unknown as Response;
    //   const mockNext = jest.fn() as NextFunction;

    //   // jest.spyOn(mockResponse.locals.user, 'name').mockImplementation(() => {
    //   //   throw mockError;
    //   // });

    //   await getUserDetailsHandler(mockRequest, mockResponse, mockNext);

    //   expect(mockNext).toHaveBeenCalledWith(mockError);
    // });
  });

  describe('listUsersHandler', () => {
    it('should return a list of users without passwords', async () => {
      const mockUsers = [
        {
          id: 'user1',
          name: 'Alice',
          email: 'alice@example.com',
          role: 'user',
        },
        {
          id: 'user2',
          name: 'Bob',
          email: 'bob@example.com',
          role: 'user',
        },
      ] as User[]; // Mock user data array

      jest.spyOn(userService, 'findAllUsers').mockResolvedValue(mockUsers);
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      const mockRequest = { params: {} } as unknown as Request;
      const mockNext = jest.fn() as NextFunction;

      await listUsersHandler(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockUsers.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        })),
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with an error if an exception occurs', async () => {
      const mockError = new Error('Failed to list users');

      jest.spyOn(userService, 'findAllUsers').mockRejectedValue(mockError);
      const mockResponse = { status: jest.fn(), json: jest.fn() } as unknown as Response;

      const mockRequest = { params: {} } as unknown as Request;
      const mockNext = jest.fn() as NextFunction;

      await listUsersHandler(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
