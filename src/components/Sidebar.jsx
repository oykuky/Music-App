import Link from "next/link";
import React from "react";
import { BiLibrary } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { useRouter } from "next/router";


function Sidebar() {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;
  return(
   <div className="bg-gray-800 bg-opacity-50 h-full w-1/5 rounded-lg text-white font-semibold gap-2 flex flex-col">
      <Link href="/" 
         className={`flex flex-row gap-2 items-center  ${isActive("/") ? "text-pink-400" : "text-white"}
         rounded-full p-2 m-2`}>
        <IoIosHome className='h-8 w-8'/>
        <h3>Home</h3>
      </Link>
      <Link href=""className={`flex flex-row gap-2 items-center  ${isActive("") ? "text-pink-400" : "text-white"}
        rounded-full p-2 m-2`}>
        <BiLibrary  className='h-8 w-8' />
        <h3>Your Library</h3>
      </Link>
      <Link href="/favorites"  className={`flex flex-row gap-2 items-center  ${isActive("/favorites") ? "text-pink-400" : "text-white"}
        rounded-full p-2 m-2`}>
        <MdFavoriteBorder  className='h-8 w-8' />
        <h3>Favorites</h3>
      </Link>
      <Link href="/explore" className={`flex flex-row gap-2 items-center  ${isActive("/explore") ? "text-pink-400" : "text-white"}
        rounded-full p-2 m-2`}>
        <MdOutlineExplore  className='h-8 w-8' />
        <h3>Explore</h3>
      </Link>
  </div>  
  );
}

export default Sidebar;
