import { z } from "zod";

export const RateVoteValidator = z.object({
    movieDbId: z.number(),
    value: z.number().min(0).max(5),
    title: z.string()
})

export type CreateRateVotePayload = z.infer<typeof RateVoteValidator>;