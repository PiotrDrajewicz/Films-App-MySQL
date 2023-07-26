import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const session = await getAuthSession();

        //Check if user is logged-in
        if (!session?.user) {
            return NextResponse.json("Unauthorized", {status: 401});
        }

        const body = await req.json();




    } catch (error) {
        console.log(error);
    }
}