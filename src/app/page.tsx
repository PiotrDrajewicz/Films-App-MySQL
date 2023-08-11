"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import MovieItem from '@/components/MovieItem';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import tvAnimationData from '@/lib/animations/tv_animation.json';

interface MovieData {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}


const HomePage: React.FC = () => {
    const [movies, setMovies] = useState<any>({});
    const [title, setTitle] = useState<string | undefined>('');
    const [pageSelectNum, setPageSelectNum] = useState<number>(1);

    const getMovies = async (api: string) => {
        const res = await fetch(api);
        const data = await res.json();
        // return data;
        setMovies(data);
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setTitle(e.target.value);
    }

    const incrementPage = ():void => {
        setPageSelectNum(prev => prev + 1);
    }

    const decrementPage = ():void => {
        if (pageSelectNum > 1) setPageSelectNum(prev => prev - 1);
    }

    useEffect(() => {
        if (title) {
            getMovies(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${title}&page=${pageSelectNum}&include_adult=false`);
        } else {
            getMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${pageSelectNum}`);
        }
    }, [pageSelectNum, title])


    return (
        <>
            <div className="home-page-container">
                <section className="animation-container">
                    <h1 className="homepage-title">Films Library</h1>
                    <Lottie className='tv-animation' animationData={tvAnimationData} loop={true} />
                </section>
                <section className='input-container'>
                    <input className='movie-input' type="text" value={title} 
                    placeholder="Find movie" onChange={changeTitle} />
                </section>
                <section className="movies-container">
                    {movies.results?.map((movie: MovieData) => {
                        const { id, title, poster_path, overview} = movie;
                        const isOpen = false;
                        return (
                            <>
                                <MovieItem layoutId={id.toString()} key={id} movieId={id} title={title} poster_path={poster_path} isOpen={isOpen} overview={overview} />
                            </>
                        )
                    })}
                </section>
                <section className="page-select-container">
                    <FontAwesomeIcon className="arrow-icon" icon={faAngleLeft} style={{color: 'white'}} size='2x' onClick={decrementPage}/>
                    <p className="page-select-num">{pageSelectNum}</p>
                    <FontAwesomeIcon className="arrow-icon" icon={faAngleRight} style={{color: 'white'}} size='2x'  onClick={incrementPage}/>
                </section>
            </div>
        </>
    )
}

export default HomePage;