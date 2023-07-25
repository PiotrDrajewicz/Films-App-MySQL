// import { db } from '@/lib/db';
// import { getAuthSession } from '@/lib/auth';
// import { NextResponse } from 'next/server';
// import { LikeVoteValidator } from '@/lib/validators/LikeVote';

// export async function POST(req: Request) {
//     try {
//         const session = await getAuthSession();

//         if(!session?.user) {
//             return NextResponse.json('Unauthorized', {status: 401});
//         }

//         const body = await req.json();
//         const { filmLikedId } = LikeVoteValidator.parse(body);

//         const likeVote = await db.likeVote.create({
//             data: {
//                 userLikedId: session.user.id,
//                 filmLikedId
//             }
//         })

//         return NextResponse.json(`LikeVote added ${filmLikedId}`, {status: 200});

//     } catch (error) {
//         console.log(error);
//     }
// }