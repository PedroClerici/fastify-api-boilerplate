import { ValidationError } from "fastify-zod-openapi";

abstract class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409);
  }
}

export function makeError(error: Error) {
  if (error instanceof ApiError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof SyntaxError) {
    return {
      message: error.message,
      statusCode: 400,
    };
  }

  if (error instanceof ValidationError) {
    if (error.httpPart !== "response") {
      return {
        message: "Validation Failed",
        statusCode: 400,
        issues: error.zodError.errors,
      };
    }
  }

  return {
    message: "Internal Server Error",
    statusCode: 500,
  };
}
