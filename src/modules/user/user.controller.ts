import { UserService } from './user.service';
import { RegisterUserRequest, LoginUserRequest, UpdateUserRequest } from './user.dto';
import { UserEntity } from './user.entity';
import { Response, NextFunction, Request } from 'express';

export class UserController {
  static register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: RegisterUserRequest = req.body;
      const response = await UserService.register(request);
      res.status(200).json({
        data: response.toResponse(),
      });
    } catch (e) {
      next(e);
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: LoginUserRequest = req.body;
      const response = await UserService.login(request);
      res.status(200).json({
        data: response.toLoginResponse(),
      });
    } catch (e) {
      next(e);
    }
  };

  static get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user as UserEntity;
      const response = await UserService.get(user);
      res.status(200).json({
        data: response.toResponse(),
      });
    } catch (e) {
      next(e);
    }
  };

  static update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user as UserEntity;
      const request: UpdateUserRequest = req.body;
      const response = await UserService.update(user, request);
      res.status(200).json({
        data: response.toResponse(),
      });
    } catch (e) {
      next(e);
    }
  };

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user as UserEntity;
      const response = await UserService.logout(user);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  };
}
