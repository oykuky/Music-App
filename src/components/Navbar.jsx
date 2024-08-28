import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import Image from 'next/image';

function Navbar() {
  const [search,setSearch] = useState();
  return (
    <div className= 'sticky h-20 flex justify-between items-center my px-5 md:px-3 bg-red-400'>
      <div className='items-center justify-center flex md:pl-80 lg:pl-96 '>
        <div className='rounded-full items-center bg-gray-800 m-2 p-3 hover:bg-gray-400'>
         <IoIosHome className='text-gray-600 text-[25px]' />
        </div>
        <div className='items-center hover:bg-gray-400 flex h-full rounded-full px-5 bg-gray-800 sm:w-80 lg:w-[450px]'>
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
        <Image src='/noavatar.png' width={45} height={45} className='rounded-full'/>
      </div>
    </div>
  
  )
}

export default Navbar
