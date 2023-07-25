import { useRouter } from 'next/navigation';

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

const getRatedMovies = async () => {
    const res = await fetch('http://127.0.0.1:8090/api/collections/rated_movies/records?page=1&perPage=30', 
    {cache: 'no-store'}
    );
    const data = await res.json();
    return data.items as any[];
}

const RateNumber: React.FC<RateNumberInterface> = ({isRateOpen, rating, pocketBaseId, movieId, title, poster_path, overview, isFav, setIsRateOpen, setRating}) => {

    const router = useRouter();
    
    const giveRating = async () => {
        setIsRateOpen(false);
        setRating(rating);
        const ratedMovies = await getRatedMovies();
        const isInDatabase = ratedMovies.some(movie => movie.movieId === movieId)
        if (isInDatabase && rating) {
            await fetch(`http://127.0.0.1:8090/api/collections/rated_movies/records/${pocketBaseId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating
                }),
            });

            router.refresh();
        }
        if (isInDatabase && !rating) {
            await fetch(`http://127.0.0.1:8090/api/collections/rated_movies/records/${pocketBaseId}`, {
                method: 'DELETE',
            });
    
            router.refresh();
        }
        if (!isInDatabase && rating) {
            // console.log('nie ma');
            await fetch('http://127.0.0.1:8090/api/collections/rated_movies/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId,
                    title,
                    poster_path,
                    overview,
                    isFav,
                    rating
                }),
            });

            router.refresh();
        }
    }

    return (
        <p className={`rate-number ${ isRateOpen ? 'visible' : null}`} onClick={giveRating}>{rating}</p>
    )
}

export default RateNumber;