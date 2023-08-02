'use client';

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { CreateLikeVoteDeletePayload } from "@/lib/validators/LikeVoteDelete";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { HeartOff } from 'lucide-react';

interface LikeVote {
    id: string,
    userLikedId: string,
    filmLikedId: string,
    movieDbId: number,
    title: string,
}



const FilmLibraryItem: React.FC<LikeVote> = ({ movieDbId, title }) => {
    const [filmInfo, setFilmInfo] = useState<any>({});
    const router = useRouter();

    const getFilm = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieDbId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
        const data = await res.json();
        setFilmInfo(data);
    }

    // console.log(filmInfo)

    const deleteFav = async () => {
        const likeVoteToDeletePayload: CreateLikeVoteDeletePayload = {
            movieDbId
        };
        
        await axios.delete('/api/filmsLibrary/fav/delete', { data: likeVoteToDeletePayload });

        router.refresh();
    }

    useEffect(() => {
        getFilm();
    }, [])

    return (
        <div className="movie-profile-container">
            <article className="movie-arr-item">
                <Image className="profile-poster movie-info-item" alt="film poster" src={`https://image.tmdb.org/t/p/original${filmInfo.poster_path}`} width={100} height={100} />
                <Link href={`/`} className="movie-profile-link">
                    <div className="link-container">
                        <h3 className="movie-info-item profile-movie-title">{title}</h3>
                    </div>
                </Link>
                <HeartOff className="delete-fav-icon movie-info-item" onClick={deleteFav} />
            </article>
        </div>
    )
}

export default FilmLibraryItem;