'use client'
import { playPause, setActiveSong } from '@/redux/playerSlice';
import Image from 'next/image'
import React from 'react'
import { GiPlayButton } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';

function PlaylistCard({ song, data, i }) {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
      <div className='mx-1 grid grid-cols-4 gap-12 items-center mt-7 rounded-lg bg-purple-950 bg-opacity-60
      w-full
       hover:bg-transparent text-gray-800  h-[80px]  md:h-[80px]
        cursor-pointer hover:shadow-xl transition-transform duration-300'>
          <div className='flex flex-row  items-center'>
            <Image src={song?.album.cover} alt={song.title} width={80} height={80} className='rounded-tl-lg rounded-bl-lg shrink-0 mr-3'/>
            <div className='flex flex-col gap-y-1.5 items-start justify-start '>

            <h2 className='text-white font-semibold text-md line-clamp-1'>{song?.title}</h2>
          <p className='text-gray-300 font-semibold text-sm hover:underline line-clamp-1'>{song?.artist.name}</p>
            </div>

          </div>
          <p className='text-white font-semibold px-5'>{song?.artist.name}</p>
          {/* <h4 className='text-white font-semibold px-3'>{song?.album.title}</h4> */}
          <div onClick={handlePlayClick} className='bg-transparent justify-center flex ml-auto mr-2 items-center h-10 w-10 rounded-lg cursor-pointer mt-1 hover:bg-yellow-400 transition-colors duration-300'>
              <GiPlayButton className="h-5 w-5 md:h-8 md:w-8 fill-white p-1" />
          </div>
      </div>
  )
}

export default PlaylistCard
