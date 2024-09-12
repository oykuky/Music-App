import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


function Navbar() {
  const [search,setSearch] = useState();
  const router = useRouter();
  const {data:session} = useSession();
  const logOut = async() =>{
    await signOut();
  }
  return (
    <div className= 'h-20 flex justify-between items-center px-4 md:px-3 bg-black bg-opacity-50 my-2'>
      <div>
       <img src='/logo.svg' alt ="logo" className='bg-yellow-500 rounded-full w-30 h-30 p-1'></img>
      </div>
      <div className='items-center justify-center flex'>
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
     <div>
      { session ?
        (
          <div className='flex justify-center items-center gap-2'>
            <div>
             <button onClick={logOut} className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold rounded-full text-m px-5 py-2.5 text-center me-2 dark:focus:ring-yellow-900">Log out</button>
            </div>
            <div className='border-yellow-600 border-[4px] rounded-full '>
             <Image src='/noavatar.png' alt ="profileimg" width={40} height={40} className='rounded-full cursor-pointer'/>
            </div>
          </div>
        )
       : 
        (<div>
          <button onClick={()=>router.push('/login')} className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold rounded-full text-m px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Login</button>) 
        </div> )
      }
     </div>
    </div>
  )
}

export default Navbar
