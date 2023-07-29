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

        //Check if rate vote already exists
        const rateVoteExists = await db.rateVote.findFirst({
            where: {
                userRatedId: session.user.id,
                movieDbId
            }
        })

        //Update or create the rate vote
        if (rateVoteExists) {
            const updatedRateVote = await db.rateVote.update({
                where: {
                    id: rateVoteExists.id,
                    userRatedId: session.user.id,
                    movieDbId
                },
                data: {
                    value
                }
            })
        } else {
            const createdRateVote = await db.rateVote.create({
                data: {
                    userRatedId: session.user.id,
                    filmRatedId: film.id,
                    movieDbId,
                    value
                }
            })
        }

        return NextResponse.json(`Rate vote added: ${title} - ${value}`);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(error.message, {status: 422});
        }

        return NextResponse.json("Could not update film's rating", {status: 500});
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getAuthSession();

        //Check if user is logged-in
        if (!session?.user) {
            return NextResponse.json("Unauthorized", {status: 401});
        }

        const body = await req.json();
        const { movieDbId, value, title } = RateVoteValidator.parse(body);

        //Check if rate vote already exists
        const rateVoteExists = await db.rateVote.findFirst({
            where: {
                userRatedId: session.user.id,
                movieDbId
            }
        })

        if (rateVoteExists) {
            await db.rateVote.deleteMany({
                where: {
                    userRatedId: session.user.id,
                    movieDbId
                }
            })
        }

        return NextResponse.json('Rate vote deleted', {status: 200});

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(error.message, {status: 422});
        }

        return NextResponse.json("Could not delete film's rating", {status: 500});
    }
}