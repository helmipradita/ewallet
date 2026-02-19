export enum ErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export enum ErrorTitle {
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  CONFLICT = 'Conflict',
  VALIDATION_ERROR = 'Validation Error',
  INTERNAL_ERROR = 'Internal Server Error',
}

export interface ErrorResponse {
  errors: string;
}

export class BaseException extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: ErrorCode = ErrorCode.INTERNAL_ERROR
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): ErrorResponse {
    return {
      errors: this.message,
    };
  }
}

export class BadRequestException extends BaseException {
  constructor(message: string) {
    super(message, 400, ErrorCode.BAD_REQUEST);
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, ErrorCode.UNAUTHORIZED);
  }
}

export class ForbiddenException extends BaseException {
  constructor(message: string = 'Forbidden') {
    super(message, 403, ErrorCode.FORBIDDEN);
  }
}

export class NotFoundException extends BaseException {
  constructor(resource: string) {
    super(`${resource} not found`, 404, ErrorCode.NOT_FOUND);
  }
}

export class ConflictException extends BaseException {
  constructor(message: string) {
    super(message, 409, ErrorCode.CONFLICT);
  }
}

export class ValidationException extends BaseException {
  constructor(message: string = 'Validation failed') {
    super(message, 400, ErrorCode.VALIDATION_ERROR);
  }
}
