import Image from 'next/image'
import React from 'react'
import { MdFavoriteBorder } from "react-icons/md";

function SongCard() {
  return (
    <div className='mx-5'>
      <div className='flex flex-col justify-center items-center gap-3 mt-3 rounded-xl p-5 bg-black opacity-55 text-gray-800 w-[125px] h-[190px] md:w-[230px] md:h-[350px]'>
        <Image src="/noavatar.png" alt="Songimg" width={200} height={150} className='rounded-xl mt-7'/>
        <h2 className='text-white font-bold'>Title</h2>
        <div className='bg-transparent rounded-full cursor-pointer hover:bg-pink-400 p-1.5'>
          <MdFavoriteBorder className="h-8 w-8 fill-pink-600"/>
        </div>
      </div>
    </div>
  )
}

export default SongCard
