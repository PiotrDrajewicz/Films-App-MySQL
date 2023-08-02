import FilmLibraryItem from "@/components/FilmLibraryItem";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

interface LikeVote {
    id: string,
    userLikedId: string,
    filmLikedId: string,
    movieDbId: number,
    title: string,
}

const getFilms = async () => {
    const session = await getAuthSession();
    if (!session?.user) {
        console.log("Unauthorized");
    }

    const likeVotes = await db.likeVote.findMany({
        where: {
            userLikedId: session?.user.id
        }
    })

    return likeVotes;
}

const FavFilmsList = async () => {
    const favFilms: LikeVote[] = await getFilms();

    return (
        <div>
            {favFilms?.map((likeVote: LikeVote) => {
                return <FilmLibraryItem key={likeVote.id} {...likeVote} />
            })}
        </div>
    )
}

export default FavFilmsList;