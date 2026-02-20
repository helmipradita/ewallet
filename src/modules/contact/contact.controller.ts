import { ContactService } from './contact.service';
import { CreateContactRequest, UpdateContactRequest, SearchContactRequest } from './contact.dto';
import { UserEntity } from '../user/user.entity';
import { Response, NextFunction, Request } from 'express';

export class ContactController {
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user as UserEntity;
      const request: CreateContactRequest = req.body;
      const response = await ContactService.create(user, request);
      res.status(200).json({
        data: response.toResponse(),
      });
    } catch (e) {
      next(e);
    }
  };

  static get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user as UserEntity;
      const contactId = Number(req.params.contactId);
      const response = await ContactService.get(user, contactId);
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
      const contactId = Number(req.params.contactId);
      const request: UpdateContactRequest = req.body;
      const response = await ContactService.update(user, contactId, request);
      res.status(200).json({
        data: response.toResponse(),
      });
    } catch (e) {
      next(e);
    }
  };

  static remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user as UserEntity;
      const contactId = Number(req.params.contactId);
      await ContactService.delete(user, contactId);
      res.status(200).json({
        data: 'OK',
      });
    } catch (e) {
      next(e);
    }
  };

  static search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user as UserEntity;
      const request: SearchContactRequest = {
        name: req.query.name as string | undefined,
        email: req.query.email as string | undefined,
        phone: req.query.phone as string | undefined,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const response = await ContactService.search(user, request);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}
