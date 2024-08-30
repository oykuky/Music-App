import Link from "next/link";
import React, { useState } from "react";
import { BiLibrary } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";


function Sidebar() {
  return(
   <div className="bg-gray-800 bg-opacity-50 h-full w-1/5 rounded-lg text-white font-semibold gap-3 flex flex-col">
      <Link href="" className="flex flex-row gap-2 items-center bg-gray-700 hover:bg-pink-400 rounded-full p-2 m-2">
        <BiLibrary className="h-8 w-8"/>
        <h3>Your Library</h3>
      </Link>
      <Link href="" className="flex flex-row gap-2 items-center bg-gray-700 hover:bg-pink-400 rounded-full p-2 m-2">
        <MdFavoriteBorder className="h-8 w-8"/>
        <h3>Favorites</h3>
      </Link>
      <Link href="" className="flex flex-row gap-2 items-center bg-gray-700 hover:bg-pink-400 rounded-full p-2 m-2">
        <MdOutlineExplore className="h-8 w-8" />
        <h3>Explore</h3>
      </Link>
  </div>  
  );
}

export default Sidebar;
