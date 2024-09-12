import Image from 'next/image'
import React from 'react'
import { MdFavoriteBorder } from "react-icons/md";

function SongCard() {
  return (
    <div>
      <div className='flex flex-col gap-3 rounded-xl p-5 bg-white opacity-55 text-gray-800 w-32 h-32'>
        {/* <img src="" alt="" /> */}
        <h2 className='bg-white'>Title</h2>
        <h2>Desc</h2>
        <div className='flex flex-1'>
        <MdFavoriteBorder className="h-8 w-8 text-pink-600"/>
        </div>
      </div>
    </div>
  )
}

export default SongCard
