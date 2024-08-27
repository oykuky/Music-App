import React from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";

function Navbar() {
  return (
    <div className='sticky top-0 flex mx-1 mb-2 justify-center'>
      <div className='flex justify-center'>
       <div className='w-100 h-100  rounded-full bg-gray-800'>
       <IoIosHome width={50} height={50} className='' />
       </div>
       <IoSearch />
        <input type="text" name="search" placeholder='What do you want to play' className='rounded-2xl py-2 px-5 bg-gray-800 '>
        </input>
      </div>
    </div>
  )
}

export default Navbar
