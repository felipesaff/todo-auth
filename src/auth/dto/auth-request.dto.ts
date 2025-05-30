import { z } from 'zod';

export const authRequestSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export type AuthRequestDto = z.infer<typeof authRequestSchema>;
