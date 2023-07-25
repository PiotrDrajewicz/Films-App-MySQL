'use client';

import axios from "axios";
import { CreateFilmPayload } from "@/lib/validators/Film";

const TestButton = () => {

    const filmPayload: CreateFilmPayload = { 
        movieDbId: 16,
        title: 'Conan',
    };

    // const likeVotePayload: CreateLikeVotePayload = {
    //     id: 'likeVote5Id',
    //     filmLikedId: 'film5Id'
    // } 

    const postTestFilm = async () => {

        await axios.post('/api/filmsLibrary/fav/add', filmPayload);

        // await axios.all([axios.post('/api/filmsLibrary/fav/add', filmPayload), axios.post('/api/filmsLibrary/likeVote/add')]).catch((error) => {
        //     console.log(error);
        // })
    }

    return (
        <button onClick={postTestFilm}>Test</button>
    )
}


export default TestButton;