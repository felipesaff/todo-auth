import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().optional(),
  password: z.string().min(8).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
