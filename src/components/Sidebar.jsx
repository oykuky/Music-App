import React, { useState } from "react";
import { BiLibrary } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";


function Sidebar() {
  return(
   <div className="bg-gray-800 bg-opacity-50 h-full w-1/5 rounded-lg text-white font-semibold gap-3 flex flex-col">
      <div className="flex flex-row gap-2 items-center mt-2 bg-gray-700 rounded-lg">
        <BiLibrary className="h-8 w-8" />
        <h3>Your Library</h3>
      </div>
      <div className="flex flex-row gap-2 items-center mt-2 bg-gray-700 rounded-lg">
        <MdFavoriteBorder className="h-8 w-8"/>
        <h3>Favorites</h3>
      </div>
      <div className="flex flex-row gap-2 items-center mt-2 bg-gray-700 rounded-lg">
        <MdOutlineExplore className="h-8 w-8" />
        <h3>Explore</h3>
      </div>
  </div>  
  );
}

export default Sidebar;
