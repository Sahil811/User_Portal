/**
 * Schemas for validating user-related requests using Zod.
 */

import { object, string, TypeOf, z } from 'zod';
import { RoleEnumType } from '../entities/user.entity';

/**
 * Schema for validating user registration request body.
 * Validates the provided registration information, including name, email, password, and password confirmation.
 */

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({
      required_error: 'Please confirm your password',
    }),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

/**
 * Schema for validating user login request body.
 * Validates the provided login credentials, including email and password.
 */

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});

/**
 * Schema for validating email verification request parameters.
 * Validates the verification code provided in the URL parameters.
 */

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>['body'], 'passwordConfirm'>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];
