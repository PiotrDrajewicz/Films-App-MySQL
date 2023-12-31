'use client';

import MoviePopup from './MoviePopup';
import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { Scale } from 'lucide-react';

interface MovieItemInterface {
    movieId: number;
    title: string;
    poster_path: string;
    isOpen: boolean;
    overview: string;
    // layoutId: string;
    setChosenMovie: any;
}

const MovieItem: React.FC<MovieItemInterface> = ({movieId, title, poster_path, isOpen, overview, setChosenMovie}) => {
    const [isActive, setIsActive] = useState<boolean>(isOpen);
    // const [isAnyPopupOpen, setIsAnyPopupOpen] = useState<boolean>(false);
    // console.log('movie item');


    const showPopup = ():void => {
        setIsActive(prev => !prev);
    }
    
    return (
        <motion.div /*layoutId={`card-container-${movieId}`}*/ className='movie-item-container' onClick={() => setChosenMovie(movieId)}>
            {/* <motion.img className='movie-poster' src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="movie poster" onClick={showPopup} /> */}
            <motion.img  animate={{top: isActive ? '50%' : '0%', left: isActive ? '50%' : '0%', translateX: isActive ? '-50%' : '0%', translateY: isActive ? '-50%' : '0%', position: isActive ? 'fixed' : 'relative' }} transition={{duration: 2, delay: 0.15}} /*initial={{width: 124, height: 185}}*/  className={`movie-poster`} src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="movie poster" onClick={showPopup} />
            <AnimatePresence >
            {/* { isActive ? <MoviePopup title={title} poster_path={poster_path} setIsActive={setIsActive} overview={overview} movieId={movieId} /> : null } */}
            {/* {isActive && <motion.img initial={{width: 124, height: 185}} animate={{width: 300, height: 400}}  className='movie-popup' src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="movie poster" />} */}
            {/* { isActive ? <MoviePopup title={title} poster_path={poster_path} setIsActive={setIsActive} overview={overview} movieId={movieId} /> : null } */}
            </AnimatePresence >
        </motion.div>
    )
}

export default MovieItem;