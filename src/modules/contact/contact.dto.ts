import { z } from 'zod';

// Request DTOs
export const CreateContactSchema = z.object({
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).max(20).optional(),
});

export const UpdateContactSchema = z.object({
  first_name: z.string().min(1).max(100).optional(),
  last_name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).max(20).optional(),
});

export const SearchContactSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  page: z.number().int().positive().optional(),
  size: z.number().int().positive().max(100).optional(),
});

// Types
export type CreateContactRequest = z.infer<typeof CreateContactSchema>;
export type UpdateContactRequest = z.infer<typeof UpdateContactSchema>;
export type SearchContactRequest = z.infer<typeof SearchContactSchema>;

// Response DTOs
export interface ContactResponseDTO {
  id: number;
  first_name: string;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface ContactListDTO {
  data: ContactResponseDTO[];
  paging: {
    current_page: number;
    total_page: number;
    size: number;
  };
}
