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
    // layoutId: string;
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
        
            <motion.section 
            initial={{opacity: 1}} 
            animate={{opacity: 1}} 
            exit={{opacity: 1, transition: {duration: 0.15}}}
            transition={{duration: 1, delay: 0.15}}
            layoutId={`card-container-${movieId}`}
            ref={popupRef} 
            className="movie-popup-container" >
                <div className="movie-popup">
                    <p className='popup-test'>This is movie popup</p>
                </div>
            </motion.section>
        
    )
}

export default MoviePopup;