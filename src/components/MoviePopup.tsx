import { useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStarHalfStroke, faXmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import RateNumber from './RateNumber';
import axios from 'axios';
import { CreateFilmPayload } from '@/lib/validators/Film';
import { CreateLikeVoteDeletePayload } from '@/lib/validators/LikeVoteDelete';
import { Star, Heart, X } from 'lucide-react';
import HeartIcon from './HeartIcon';
import XIcon from './XIcon';
import { motion } from 'framer-motion';


interface MoviePopupInterface {
    movieId: number,
    title: string;
    poster_path: string;
    setIsActive: (isOpen: boolean) => void;
    overview: string;
}

interface LikeVote {
    id: string,
    userLikedId: string,
    filmLikedId: string,
    movieDbId: number,
    title: string
}

interface RateVote {
    id: string,
    userRatedId: string,
    filmRatedId: string,
    movieDbId: number,
    value: number
}



const isOpen: boolean = false;
const rates:number[] = [0, 1, 2, 3, 4, 5];

const getMovies = async (collection: string) => {
    const res = await fetch(`http://127.0.0.1:8090/api/collections/${collection}/records?page=1&perPage=30`, 
    {cache: 'no-store'}
    );
    const data = await res.json();
    return data.items as any[];
}

const MoviePopup: React.FC<MoviePopupInterface> = ({movieId, title, poster_path, setIsActive, overview}) => {
    const [isFav, setIsFav] = useState<boolean>(false);
    const [isRateOpen, setIsRateOpen] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [pocketBaseId, setPocketBaseId] = useState<string>('');
    // const [pocketFav, setPocketFav] = useState(getMovies('fav_movies'));
    const popupRef = useRef<HTMLElement>(null);

    // const router = useRouter();

    const toggleRate = (): void => {
        setIsRateOpen(prev => !prev);
    }
    
    const checkFav = async () => {
        const favRes = await axios.get('/api/filmsLibrary/fav').catch((error) => {
            console.log(error)
        })
        const filmIsFav = await favRes?.data.some((likeVote: LikeVote) => likeVote.movieDbId === movieId);

        if (filmIsFav) {
            setIsFav(true);
        }

        // console.log('res: ', filmIsFav);
    }

    const checkRating = async () => {
        const rateRes = await axios.get('/api/filmsLibrary/rated').catch((error) => {
            console.log(error);
        })
        const filmRate = await rateRes?.data.find((rateVote: RateVote) => {
            return rateVote.movieDbId === movieId;
        })

        if (filmRate) {
            setRating(filmRate.value);
            console.log('rate: ', filmRate);
        }

        if(!filmRate) {
            console.log('no rate');
        }

    }

    //     router.refresh();
    const addToFav = async () => {
        setIsFav(true);
        let isFav = true;

        const filmPayload: CreateFilmPayload = {
            movieDbId: movieId,
            title
        }

        await axios.post('/api/filmsLibrary/fav/add', filmPayload).catch((error) => {
            console.log(error);
        })
        
    }

    const deleteFav = async () => {
        setIsFav(false);

        const likeVoteToDeletePayload: CreateLikeVoteDeletePayload = {
            movieDbId: movieId
        };
        
        await axios.delete('/api/filmsLibrary/fav/delete', { data: likeVoteToDeletePayload });
    }

    const checkClick = () => {
        window.onclick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | any;

            if (target?.contains(popupRef.current) && target !== popupRef.current) {
                setIsActive(false);
                // console.log('target', target.dataset.id);
                // console.log('ref', popupRef.current?.dataset.id);
            } else {
                // console.log('target', target.dataset.id);
                // console.log('ref', popupRef.current?.dataset.id);
            }
        }
    }
    

    useEffect(()  => {
        checkClick();
        checkFav();
        checkRating();
    }, [])

    // useEffect(() => {
        // checkFav();
    // }, [isFav])

    // useEffect(() => {
        // checkRating();
    // }, [rating])

    return (
        
            <motion.section initial={{opacity: 0}} animate={{opacity: 1}} ref={popupRef} className="movie-popup-container" >
                <div className="movie-popup">
                    <img className="movie-poster-popup" src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="movie poster popup" />
                    <div className="movie-popup-buttons">
                        {/* <FontAwesomeIcon className="popup-icon add-fav-icon" icon={faHeart} style={ isFav ? {color: 'rgb(250, 45, 45)'} : {color: 'white'}} onClick={ isFav ? deleteFav : addToFav } size='2x' /> */}
                        <Heart className='popup-icon add-fav-icon' size={35} color={ isFav ? "rgb(250, 45, 45)" : "white"} fill={ isFav ? "rgb(250, 45, 45)" : "none"} onClick={ isFav ? deleteFav : addToFav } />
                        {/* <HeartIcon /> */}
                        <div className="star-container">
                            {/* <FontAwesomeIcon className="popup-icon rate-icon" icon={rating ? faStar : faStarHalfStroke} style={rating ? {color: 'gold'} : {color: 'white'}} onClick={toggleRate} size='2x' /> */}
                            <Star className="popup-icon rate-icon" color={ rating ? 'gold' : 'white'} fill={ rating ? 'gold' : 'none' } onClick={toggleRate} size={35} />
                            <p className='rate-in-star'>{rating ? rating : null}</p>
                        </div>
                        <div className={`rate-numbers ${ isRateOpen ? 'open' : null}`}>
                            {rates.map(rate => {
                                return <RateNumber key={rate} isRateOpen={isRateOpen} rating={rate} pocketBaseId={pocketBaseId} movieId={movieId} title={title} poster_path={poster_path} overview={overview} isFav={isFav} setIsRateOpen={setIsRateOpen} setRating={setRating}/>
                            })}
                        </div>
                        <div className="overview-container">
                            <h3 className="movie-title">{title}</h3>
                            <p className="overview">{overview}</p>
                        </div>
                        {/* <FontAwesomeIcon className='close-icon' icon={faXmark} onClick={() => setIsActive(isOpen)} style={{color: 'white'}} size='2x' /> */}
                        {/* <X className='close-icon' color='white' size={35} onClick={() => setIsActive(isOpen)}/> */}
                        <XIcon setIsActive={setIsActive} isOpen={isOpen} />
                    </div>
                </div>
            </motion.section>
        
    )
}

export default MoviePopup;