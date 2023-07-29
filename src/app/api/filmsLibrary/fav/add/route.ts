import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { FilmValidator } from '@/lib/validators/Film';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        //Check if user is logged-in
        if(!session?.user) {
            return NextResponse.json('Unauthorized', {status: 401});
        }

        const body = await req.json();
        const { movieDbId, title } = FilmValidator.parse(body);

        //Find or create film
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

        //Check if like vote already exists
        const likeVoteExists = await db.likeVote.findFirst({
            where: {
                userLikedId: session.user.id,
                movieDbId
            }
        })
        if (likeVoteExists) {
            return NextResponse.json("Like vote already exists", {status: 409});
        }

        //If everything is fine - create like vote
        await db.likeVote.create({
            data: {
                userLikedId: session.user.id,
                filmLikedId: film.id,
                movieDbId
            }
        })

        return NextResponse.json(`Film added: ${title}`, { status: 200});

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(error.message, {status: 422})
        }

        return NextResponse.json("Could not delete like vote", {status: 500})
    }
}