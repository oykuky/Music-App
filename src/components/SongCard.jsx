import Image from 'next/image'
import React from 'react'
import { MdFavoriteBorder } from "react-icons/md";

function SongCard({song}) {
  console.log("song info",song)
  return (
    <div className='mx-3'>
      <div className='flex flex-col justify-center items-center gap-3 mt-7 rounded-lg bg-black opacity-55 text-gray-800 w-[125px] h-[190px] md:w-[230px] md:h-[350px]'>
        <Image src={song?.album.cover} alt="Songimg" width={250} height={200} className='-mt-10 rounded-lg'/>
        <h2 className='text-white font-bold'>{song?.title_short}</h2>
        <div className='bg-transparent rounded-full cursor-pointer hover:bg-purple-800 p-1.5'>
          <MdFavoriteBorder className="h-8 w-8 fill-white"/>
        </div>
      </div>
    </div>
  )
}

export default SongCard
