import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { LikeVoteDeleteValidator } from "@/lib/validators/LikeVoteDelete";
import { z } from "zod";

export async function DELETE(req: Request) {
    try {
        const session = await getAuthSession();

        //Check if user is logged-in
        if (!session?.user) {
            return NextResponse.json("Unauthorized", {status: 401});
        }

        const body = await req.json();
        const { movieDbId } = LikeVoteDeleteValidator.parse(body);
        
        //Check if like vote exists
        const LikeVoteExists = await db.likeVote.findFirst({
            where: {
                userLikedId: session.user.id,
                movieDbId
            }
        })
        if (!LikeVoteExists) {
            return NextResponse.json("Like vote doesn't exist", {status: 409})
        }

        //If everything is fine - delete like vote
        await db.likeVote.deleteMany({
            where: {
                userLikedId: session.user.id,
                movieDbId 
            }
        })

        return NextResponse.json(`LikeVote deleted: ${movieDbId}`, {status: 200});

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(error.message, {status: 422})
        }

        return NextResponse.json("Could not delete like vote", {status: 500})
    }
}