import { useRouter } from 'next/navigation';
import axios from 'axios';

interface RateNumberInterface {
    isRateOpen: boolean;
    rating: number;
    pocketBaseId: string;
    movieId: number;
    title: string;
    poster_path: string;
    overview: string;
    isFav?: boolean;
    setIsRateOpen: (isOpen:boolean) => void;
    setRating: (rate: number) => void;
}

interface RateVote {
    movieDbId: number,
    value: number,
    title: string
}

const getRatedMovies = async () => {
    const res = await fetch('http://127.0.0.1:8090/api/collections/rated_movies/records?page=1&perPage=30', 
    {cache: 'no-store'}
    );
    const data = await res.json();
    return data.items as any[];
}

const RateNumber: React.FC<RateNumberInterface> = ({isRateOpen, rating, pocketBaseId, movieId, title, poster_path, overview, isFav, setIsRateOpen, setRating}) => {

    // const router = useRouter();
    
    const giveRating = async () => {
        setIsRateOpen(false);
        setRating(rating);

        const rateVotePayload: RateVote = {
            movieDbId: movieId,
            value: rating,
            title
        }
        // console.log(rateVotePayload.movieDbId, rateVotePayload.value, rateVotePayload.title);

        if (rating === 0) {
            await axios.delete('/api/filmsLibrary/rated/updateVote', { data: rateVotePayload }).catch((error) => {
                console.log(error);
            })
        } else {
            await axios.put('/api/filmsLibrary/rated/updateVote', rateVotePayload).catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <p className={`rate-number ${ isRateOpen ? 'visible' : null}`} onClick={giveRating}>{rating}</p>
    )
}

export default RateNumber;