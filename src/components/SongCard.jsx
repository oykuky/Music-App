import Image from 'next/image'
import React from 'react'
import { MdFavoriteBorder } from "react-icons/md";

function SongCard() {
  return (
    <div className='mx-12'>
      <div className='flex flex-col gap-3 mt-3 rounded-xl p-5 bg-white opacity-55 text-gray-800 w-[250px] h-[350px]'>
        {/* <img src="" alt="" /> */}
        <h2>Title</h2>
        <h2>Desc</h2>
        <div className='flex bottom-0'>
          <MdFavoriteBorder className="h-8 w-8 text-pink-600"/>
        </div>
      </div>
    </div>
  )
}

export default SongCard
