import { z } from 'zod';

export const UserValidation = {
  REGISTER: z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(8).max(100),
    name: z.string().min(1).max(100),
  }),
  LOGIN: z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  }),
  UPDATE: z.object({
    name: z.string().min(1).max(100).optional(),
    password: z.string().min(8).max(100).optional(),
  }),
};
