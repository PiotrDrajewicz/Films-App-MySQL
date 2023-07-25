import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { TestFilmValidator } from '@/lib/validators/testFilm';
import { z } from 'zod';

export async function GET(req: Request) {
    try {

        const session = await getAuthSession();

        if(!session?.user) {
            return NextResponse.json({message: 'Unauthorized GET'});
        }

        return NextResponse.json({message: 'Elooooo GET'})
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: Request) {
    try {

        const session = await getAuthSession();

        const body = await req.json();
        const { id, title } = TestFilmValidator.parse(body);

        if(!session?.user) {
            return NextResponse.json('Unauthorized', {status: 401});
        }

        const testFilm = await db.testFilm.create({
            data: {
                id: body.id,
                title: body.title
            }
        })

        return NextResponse.json(body);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(error.message, { status: 422 });
        }

        return NextResponse.json('Error', { status: 500 })
    }
}