import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
