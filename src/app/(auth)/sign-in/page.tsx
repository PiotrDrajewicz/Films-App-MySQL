import UserAuthForm from "@/components/UserAuthForm";
// import { getAuthSession } from "@/lib/auth";
import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";

const signInPage = async () => {

    const session = await getServerSession(authOptions);
    // const session = await getSession(authOptions);
    console.log('ss: ', session);

    return (
        <div>
            This is sing-in page.
            <UserAuthForm />
            {session?.user ? <p>Logged</p> : <p>Not logged</p>}
        </div>
    )
}

export default signInPage;