import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";

function Navbar() {
  const [search,setSearch] = useState();
  return (
    <div className='sticky my-2 flex mx-3 mb-2 justify-center '>
        <div className='rounded-full items-center bg-gray-800 m-2 p-3 hover:bg-gray-400'>
         <IoIosHome className='text-gray-600 text-[35px]' />
        </div>
        <div className='items-center hover:bg-gray-400 flex w-[600px] rounded-full px-5 bg-gray-800'>
          <IoSearch className="text-[25px] text-gray-600 "/>
          <input type="text" name="search" value={search}
           placeholder='What do you want to play ?'
           onChange={(e)=>setSearch(e.target.value)}
           className='outline-none bg-transparent p-3 w-full'></input>
        </div>
    </div>
  )
}

export default Navbar
