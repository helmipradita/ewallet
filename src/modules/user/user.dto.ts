import { z } from 'zod';

// Request DTOs
export const RegisterUserSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(100),
});

export const LoginUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  password: z.string().min(8).max(100).optional(),
});

// Types
export type RegisterUserRequest = z.infer<typeof RegisterUserSchema>;
export type LoginUserRequest = z.infer<typeof LoginUserSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;

// Response DTOs
export interface UserResponseDTO {
  username: string;
  name: string;
}

export interface LoginResponseDTO extends UserResponseDTO {
  token: string;
}
