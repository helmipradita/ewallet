import { Router } from 'express';
import { ContactController } from './contact.controller';
import { authMiddleware } from '../../common/middleware/auth.middleware';

const router = Router();

// All contact routes require authentication
router.post('/api/contacts', authMiddleware, ContactController.create);
router.get('/api/contacts/:contactId(\\d+)', authMiddleware, ContactController.get);
router.put('/api/contacts/:contactId(\\d+)', authMiddleware, ContactController.update);
router.delete('/api/contacts/:contactId(\\d+)', authMiddleware, ContactController.remove);
router.get('/api/contacts', authMiddleware, ContactController.search);

export { router as contactRoutes };
