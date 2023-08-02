import Link from "next/link";
// import { useState } from "react";
// import UserAuthForm from "./UserAuthForm";
import { getAuthSession } from "@/lib/auth";
import Image from "next/image";
import SubNavList from "./SubNavList";

const NavList = async () => {
    // const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const session = await getAuthSession();

    return (
        <div className="nav-list">
            <Link href="/" className="nav-item nav-item-text">Films</Link>
            <SubNavList />
            {/* <Link href="/library" className="nav-item nav-item-text">Library</Link>
            <div className={`sub-links ${isDropdownOpen && 'open'}`}>
              <Link href="/profile" className="nav-item sub-nav-item" onMouseOver={() => setIsDropdownOpen(true)} onMouseOut={() => setIsDropdownOpen(false)}>Favourite</Link>
              <Link href="/rated" className="nav-item sub-nav-item" id="rated-item" onMouseOver={() => setIsDropdownOpen(true)} onMouseOut={() => setIsDropdownOpen(false)}>Rated</Link >
            </div> */}
            {/* <div className={`sub-links ${isDropdownOpen && 'open'}`}>
              <Link href="/profile" className="nav-item sub-nav-item" onMouseOver={() => setIsDropdownOpen(true)} onMouseOut={() => setIsDropdownOpen(false)}>Favourite</Link>
              <Link href="/rated" className="nav-item sub-nav-item" id="rated-item" onMouseOver={() => setIsDropdownOpen(true)} onMouseOut={() => setIsDropdownOpen(false)}>Rated</Link >
            </div> */}
            {/* <Link href="/sign-in" className="nav-item">Profile</Link> */}
            {/* <UserAuthForm /> */}
            {session ? <Link href='/profile' id="nav-item-img-link" className="nav-item"><Image src={session?.user.image!} alt="user profile picture" className="nav-user-image" id='nav-item-img' width={40} height={40} referrerPolicy='no-referrer'/></Link> : <Link href="/sign-in" className="nav-item nav-item-text">Sign In</Link>}
        </div>
        
    )
}

{/* <div className="nav-list">
<Link href="/" className="nav-item">Movies</Link>
<Link href="/profile" className="nav-item" onMouseOver={() => setIsDropdownOpen(true)} onMouseOut={() => setIsDropdownOpen(false)}>Library</Link>
<div className={`sub-links ${isDropdownOpen && 'open'}`}>
  <Link href="/profile" className="nav-item sub-nav-item" onMouseOver={() => setIsDropdownOpen(true)} onMouseOut={() => setIsDropdownOpen(false)}>Favourite</Link>
  <Link href="/rated" className="nav-item sub-nav-item" id="rated-item" onMouseOver={() => setIsDropdownOpen(true)} onMouseOut={() => setIsDropdownOpen(false)}>Rated</Link >
</div>
<UserAuthForm />
{session ? <p>Logged</p> : <p>Not logged</p>}
</div> */}

export default NavList;