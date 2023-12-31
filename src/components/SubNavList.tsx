'use client';

import Link from "next/link";
import { useState } from 'react';

const SubNavList = () => {
const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    return (
        <div className="sub-links-container" onMouseOver={() => setIsDropdownOpen(true)} onMouseOut={() => setIsDropdownOpen(false)}>
            <Link href="/library" className="nav-item nav-item-text">Library</Link>
            <div className={`sub-links ${isDropdownOpen ? 'open' : ''}`}>
              <Link href="/profile" id="sub-nav-item-all" className="sub-nav-item" >All</Link>
              <Link href="/library/favourite" id="sub-nav-item-favourite" className="sub-nav-item" >Favourite</Link>
              <Link href="/profile" id="sub-nav-item-rated" className="sub-nav-item" >Rated</Link>
            </div>
        </div>
    )
}

export default SubNavList;