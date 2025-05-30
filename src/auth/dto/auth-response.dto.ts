import { z } from 'zod';

export const authResponseSchema = z.object({
  accessToken: z.string(),
  expiresIn: z.number(),
});

export type AuthResponseDto = z.infer<typeof authResponseSchema>;
