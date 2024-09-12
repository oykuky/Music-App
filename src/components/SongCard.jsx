import Image from 'next/image'
import React from 'react'
import { MdFavoriteBorder } from "react-icons/md";

function SongCard() {
  return (
    <div className='mx-12'>
      <div className='flex flex-col justify-center items-center gap-3 mt-3 rounded-xl p-5 bg-black opacity-55 text-gray-800 w-[250px] h-[380px]'>
        <Image src="/noavatar.png" alt="Songimg" width={250} height={150} className='rounded-xl mt-7'/>
        <h2 className='text-white'>Title</h2>
        <div className='bg-pink-300 rounded-full p-1.5'>
          <MdFavoriteBorder className="h-9 w-9 fill-pink-600"/>
        </div>
      </div>
    </div>
  )
}

export default SongCard
