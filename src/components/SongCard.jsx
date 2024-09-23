import Image from 'next/image'
import React from 'react'
import { MdFavoriteBorder } from "react-icons/md";

function SongCard({song}) {
  return (
    <div className='mx-3'>
      <div className='flex flex-col justify-between items-center gap-3 mt-7 rounded-lg bg-black bg-opacity-60 text-gray-800 w-[305px] h-[450px] md:w-[250px] md:h-[410px] cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300 p-1'>
        <Image src={song?.album.cover} alt={song.title} width={250} height={200} className='w-full h-auto object-cover rounded-lg'/>
        <h2 className='text-white font-bold text-lg text-center'>{song?.title_short}</h2>
        <p className='text-white font-semibold text-center'>{song?.artist.name}</p>
        <div className='bg-transparent rounded-full cursor-pointer hover:bg-purple-800 p-1.5 transition-colors duration-300'>
          <MdFavoriteBorder className="h-6 w-6 md:h-8 md:w-8 fill-white"/>
        </div>
      </div>
    </div>
  )
}

export default SongCard