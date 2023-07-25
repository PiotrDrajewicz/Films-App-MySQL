import { z } from 'zod';

export const LikeVoteDeleteValidator = z.object({
    movieDbId: z.number(),
})

export type CreateLikeVoteDeletePayload = z.infer<typeof LikeVoteDeleteValidator>;