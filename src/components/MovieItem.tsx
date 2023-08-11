'use client';

import MoviePopup from './MoviePopup';
import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';

interface MovieItemInterface {
    movieId: number;
    title: string;
    poster_path: string;
    isOpen: boolean;
    overview: string;
    layoutId: string;
}

const MovieItem: React.FC<MovieItemInterface> = ({movieId, title, poster_path, isOpen, overview, layoutId}) => {
    const [isActive, setIsActive] = useState<boolean>(isOpen);
    // const [isAnyPopupOpen, setIsAnyPopupOpen] = useState<boolean>(false);
    // console.log('movie item');


    const showPopup = ():void => {
        setIsActive(prev => !prev);
    }
    
    return (
        <>
            {/* <motion.img className='movie-poster' src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="movie poster" onClick={showPopup} /> */}
            <motion.img initial={{width: 124, height: 185}}  className='movie-poster' src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="movie poster" onClick={showPopup} />
            <AnimatePresence >
            {/* { isActive ? <MoviePopup title={title} poster_path={poster_path} setIsActive={setIsActive} overview={overview} movieId={movieId} /> : null } */}
            {isActive && <motion.img layoutId={layoutId} initial={{width: 124, height: 185}} animate={{width: 300, height: 400}}  className='movie-popup' src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="movie poster" />}
            </AnimatePresence >
        </>
    )
}

export default MovieItem;