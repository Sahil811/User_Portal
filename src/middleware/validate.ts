/**
 * Middleware function for validating request data against a Zod schema.
 * Validates request parameters, query parameters, and request body against the specified Zod schema.
 * If validation fails, it responds with a 400 status and error details.
 * @param schema The Zod schema to validate against.
 * @returns A middleware function for request validation.
 */

import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    // Parse and validate request data against the provided Zod schema
    schema.parse({
      params: req.params,
      query: req.query,
      body: req.body,
    });

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // Respond with a 400 status and error details if validation fails
      return res.status(400).json({
        status: 'fail',
        errors: error.errors,
      });
    }
    // Pass any other errors to the next middleware
    next(error);
  }
};
