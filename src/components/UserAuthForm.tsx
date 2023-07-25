'use client';

import Link from "next/link";
import { signIn } from 'next-auth/react';

const UserAuthForm = () => {

    const googleSignIn = async () => {
        try {
            await signIn('google');
        } catch (error) {
            //TO DO - error notification
            console.error(error);
        }
    }

    return (
        <button onClick={googleSignIn}>Sign In</button>
    )
}

export default UserAuthForm;