import { z } from 'zod';

export const TestFilmValidator = z.object({
    id: z.number(),
    title: z.string()
})

export type CreateTestFilmPayload = z.infer<typeof TestFilmValidator>;