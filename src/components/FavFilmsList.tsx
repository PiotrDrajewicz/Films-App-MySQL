// 'use client';

import axios from "axios";
// import { useState, useEffect } from "react";
import FilmLibraryItem from "@/components/FilmLibraryItem";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

interface LikeVote {
    id: string,
    userLikedId: string,
    filmLikedId: string,
    movieDbId: number,
    title: string,
}

interface User {
    id: number,
    name: string
}

const getFilms = async () => {
    // const res = await axios.get('http://localhost:3000/api/filmsLibrary/fav').catch((error) => {
    //     console.log(error);
    // });
    
    // console.log('gowno-------------------------------------------')
    // return res?.data as any[];

    try {
        const res = await fetch('http://127.0.0.1:3000/api/filmsLibrary/fav', {
            method: 'GET',
            cache: 'no-store'
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const getFilmsDB = async () => {
    const session = await getAuthSession();

    const likeVotes = await db.likeVote.findMany({
        where: {
            userLikedId: session?.user.id
        }
    })

    return likeVotes;
}

// const getUsers = async () => {
//     // const res: User[] | any = await axios('https://retoolapi.dev/98kQ1f/users').catch((error) => {
//     //     console.log(error);
//     // })
//     try {
//         const res = await fetch('https://retoolapi.dev/98kQ1f/users');
//         const data = await res.json();
//         return data;
//     } catch (error) {
//         console.log(error);
//     }

// }

const FavFilmsList = async () => {
    // const [favFilms, setFavFilms] = useState<any>([]);
    // const [filmDeleted, setFilmDeleted] = useState<boolean>(false);
    // const router = useRouter();
    // const favFilms = await getFilms();
    const favFilms = await getFilmsDB();
    // const users = await getUsers();

    // const getFilms = async () => {
    //     try {
    //         const res = await fetch('http://localhost:3000/api/filmsLibrary/fav');
    //         const data = await res.json();
    //         setFavFilms(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
    // const getFilms = async () => {
    //     const res = await axios.get('/api/filmsLibrary/fav').catch((error) => {
    //         console.log(error);
    //     });
    //     setFavFilms(res?.data);
    // }

    // if (filmDeleted) {
    //     // console.log('kupa')
    //     // router.refresh();
    //     setFilmDeleted(false);
    // }
    // useEffect(() => {
    //     getFilms();
    // }, [])

    // console.log('users: ', users);
    console.log('favFilms: ', favFilms);

    return (
        <div>
            {favFilms?.map((likeVote: LikeVote) => {
                return <FilmLibraryItem key={likeVote.id} {...likeVote} />
            })}
            {/* {users?.map((user: User) => {
                return <p key={user.id}>{user.name}</p>
            })} */}
        </div>
    )
}

export default FavFilmsList;