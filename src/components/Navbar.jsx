import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import Image from 'next/image';

function Navbar() {
  const [search,setSearch] = useState();
  return (
    <div className= 'sticky h-20 flex justify-between items-center px-4 md:px-3 bg-black bg-opacity-50 my-2'>
      <div>
       <img src='/logo.svg' className='bg-yellow-500 rounded-full w-30 h-30 p-1'></img>
      </div>
      <div className='items-center justify-center flex md:pl-80 lg:pl-96 '>
        <div className='rounded-full items-center mr-3 bg-gray-800 p-3 hover:bg-gray-500'>
         <IoIosHome className='text-gray-600 text-[28px]' />
        </div>
        <div className='items-center hover:bg-gray-500 flex h-full rounded-full px-5 bg-gray-800 sm:w-80 lg:w-[450px]'>
          <IoSearch className="text-[25px] text-gray-600 "/>
          <input
            type="text" name="search" value={search}
            placeholder='What do you want to play ?'
            onChange={(e)=>setSearch(e.target.value)}
            className='outline-none bg-transparent p-3 w-full'>
          </input>
        </div>
      </div>
      <div className='sm:pl-2'>
        <Image src='/noavatar.png' width={45} height={45} className='rounded-full cursor-pointer'/>
      </div>
    </div>
  
  )
}

export default Navbar
