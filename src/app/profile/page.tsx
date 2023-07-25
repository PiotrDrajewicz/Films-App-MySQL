import { getAuthSession } from "@/lib/auth";
import TestButton from "@/components/TestButton";

const ProfilePage = async () => {

    const session = await getAuthSession();

    return (
        <div>
            <h2>This is profile page.</h2>
            {session?.user ? <h3>{session?.user.name}</h3> : <h3>Not logged in</h3>}
            <TestButton />
        </div>
    )
}

export default ProfilePage;