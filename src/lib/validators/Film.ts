import { z } from 'zod';

// export const UserValidator = z.object({
//     id: z.string()
// })

// export const RateValidator = z.object({
//     id: z.string()
// })

export const FilmValidator = z.object({
    // id: z.string(),
    movieDbId: z.number(),
    title: z.string(),
    // usersLiked: z.array(UserValidator),
    // usersRated: z.array(UserValidator),
    // ratesReceived: z.array(RateValidator) 
})

export type CreateFilmPayload = z.infer<typeof FilmValidator>;