import { UserService } from './user.service';
import { RegisterUserRequest, LoginUserRequest, UpdateUserRequest } from './user.dto';
import { Validation } from '../../common/validation/validation';
import { UserValidation } from './user.validation';
import { UserEntity } from './user.entity';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/express';

export class UserController {
  static register = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      const response = await UserService.register(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  };

  static login = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await UserService.login(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  };

  static get = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const response = await UserService.get(req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  };

  static update = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  };

  static logout = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const response = await UserService.logout(req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  };
}
