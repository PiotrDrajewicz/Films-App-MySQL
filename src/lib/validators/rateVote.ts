import { z } from "zod";

export const RateVoteValidator = z.object({
    movieDbId: z.number(),
    value: z.number(),
    title: z.string()
})

export type CreateRateVotePayload = z.infer<typeof RateVoteValidator>;