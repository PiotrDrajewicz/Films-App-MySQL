'use client';

import MoviePopup from './MoviePopup';
import { useState } from "react";

interface MovieItemInterface {
    movieId: number;
    title: string;
    poster_path: string;
    isOpen: boolean;
    overview: string;
}

const MovieItem: React.FC<MovieItemInterface> = ({movieId, title, poster_path, isOpen, overview}) => {
    const [isActive, setIsActive] = useState<boolean>(isOpen);
    // const [isAnyPopupOpen, setIsAnyPopupOpen] = useState<boolean>(false);
    // console.log('movie item');


    const showPopup = ():void => {
        setIsActive(prev => !prev);
    }
    
    return (
        <>
            <img className='movie-poster' src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="movie poster" onClick={showPopup} />
            { isActive ? <MoviePopup title={title} poster_path={poster_path} setIsActive={setIsActive} overview={overview} movieId={movieId} /> : null }
        </>
    )
}

export default MovieItem;