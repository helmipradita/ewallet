import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../../common/middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/api/users', UserController.register);
router.post('/api/users/login', UserController.login);

// Protected routes (require auth)
router.get('/api/users/current', authMiddleware, UserController.get);
router.patch('/api/users/current', authMiddleware, UserController.update);
router.delete('/api/users/logout', authMiddleware, UserController.logout);

export { router as userRoutes };
