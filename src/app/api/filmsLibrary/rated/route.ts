import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: Request) {
    try {
        const session = await getAuthSession();

        //Check if user is logged-in
        if (!session?.user) {
            return NextResponse.json("Unauthorized", {status: 401});
        }

        //If everything is fine - get rate votes from the db
        const rateVotes = await db.rateVote.findMany({
            where: {
                userRatedId: session.user.id,
            }
        })

        return NextResponse.json(rateVotes);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(error.message, {status: 422})
        }

        return NextResponse.json("Could not get the user's rate votes list", {status: 500})
    }



}