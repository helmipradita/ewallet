import { Response, NextFunction, Request } from 'express';
import { prisma } from '../../database/prisma/client';
import { UserEntity } from '../../modules/user/user.entity';
import { ResponseError } from '../error/response-error';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('X-API-TOKEN');
  if (!token) {
    next(new ResponseError(401, 'Unauthorized'));
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      token: token,
    },
  });

  if (!user) {
    next(new ResponseError(401, 'Unauthorized'));
    return;
  }

  (req as any).user = UserEntity.fromPrisma(user);
  next();
};
