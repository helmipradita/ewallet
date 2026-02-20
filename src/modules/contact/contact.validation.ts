import { z } from 'zod';

export const ContactValidation = {
  CREATE: z.object({
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(1).max(20).optional(),
  }),
  UPDATE: z.object({
    first_name: z.string().min(1).max(100).optional(),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(1).max(20).optional(),
  }),
  SEARCH: z.object({
    name: z.string().min(1).optional(),
    email: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
    page: z.number().int().positive().optional(),
    size: z.number().int().positive().max(100).optional(),
  }),
};
