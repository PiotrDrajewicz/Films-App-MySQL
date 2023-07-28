import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { RateVoteValidator } from "@/lib/validators/rateVote";
import { z } from "zod";

export async function PUT(req: Request) {
    try {
        const session = await getAuthSession();

        //Check if user is logged-in
        if (!session?.user) {
            return NextResponse.json("Unauthorized", {status: 401});
        }

        const body = await req.json();
        const { movieDbId, value, title } = RateVoteValidator.parse(body);

        //Check if film already exists
        // const filmFromDb = await db.film.findFirst({
        //     where: {
        //         movieDbId,
        //         title
        //     }
        // })

        //If film doesn't exist - create film
        // if (!filmFromDb) {
        //     const createdFilm = await db.film.create({
        //         data: {
        //             movieDbId,
        //             title
        //         }
        //     })
        // }

        //Check if rate vote already exists
        // const rateVoteFromDb = await db.rateVote.findFirst({
        //     where: {
        //         userRatedId: session.user.id,
        //         movieDbId
        //     }
        // })

        //Find or create the film
        const film = await db.film.upsert({
            where: {
                movieDbId,
                title
            },
            update: {},
            create: {
                movieDbId,
                title
            }
        })

        //Update or create the rate vote
        const rateVote = await db.rateVote.upsert({
            where: {
                userRatedId: session.user.id,
                movieDbId
            },
            update: {
                value
            },
            create: {
                userRatedId: session.user.id,
                filmRatedId: film.id,
                movieDbId,
                value
            }
        })

        return NextResponse.json(`Rate vote added: ${title} - ${value}`);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(error.message, {status: 422})
        }

        return NextResponse.json("Could not update film's rating", {status: 500})
    }
}