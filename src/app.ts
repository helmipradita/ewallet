import express from 'express';
import { userRoutes } from './modules/user/user.routes';
import { errorMiddleware } from './common/middleware/error.middleware';

export const web = express();
web.use(express.json());

web.use(userRoutes);

web.use(errorMiddleware);
