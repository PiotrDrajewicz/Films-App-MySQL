'use client';

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { CreateLikeVoteDeletePayload } from "@/lib/validators/LikeVoteDelete";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
// import { revalidatePath } from "next/cache";
// import { useRouter } from "next/router";

interface LikeVote {
    id: string,
    userLikedId: string,
    filmLikedId: string,
    movieDbId: number,
    title: string,
    // setFilmDeleted: (arg: any) => void
}

const FilmLibraryItem: React.FC<LikeVote> = ({ movieDbId, title }) => {
    const router = useRouter();
    // const pathName = usePathname();

    const deleteFav = async () => {
        const likeVoteToDeletePayload: CreateLikeVoteDeletePayload = {
            movieDbId
        };
        
        await axios.delete('/api/filmsLibrary/fav/delete', { data: likeVoteToDeletePayload });

        router.refresh();
        // router.push(pathName);
        // console.log(pathName);
        // setFilmDeleted(true);
        // revalidatePath('/')
    }

    return (
        <div className="movie-profile-container">
            <article className="movie-arr-item">
                <Link href={`/`} className="movie-profile-link">
                    <div className="link-container">
                        {/* <img src={`https://image.tmdb.org/t/p/original`} className='profile-poster movie-info-item' alt="movie image in profile" /> */}
                        <h3 className="movie-info-item profile-movie-title">{title}</h3>
                    </div>
                </Link>
                    <FontAwesomeIcon className="delete-fav-icon movie-info-item" icon={faHeartCircleXmark} size='2x' onClick={deleteFav} />
            </article>
        </div>
    )
}

export default FilmLibraryItem;