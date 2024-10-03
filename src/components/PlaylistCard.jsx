'use client'
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
      <div className='mx-4 grid grid-cols-4 gap-12 items-center mt-7 rounded-lg bg-purple-950 bg-opacity-60 hover:bg-transparent text-gray-800 w-[470px] h-[80px] md:w-[900px] xl:w-min md:h-[80px] cursor-pointer hover:shadow-xl transition-transform duration-300'>
          <div className='flex flex-row items-center'>
            <Image src={song?.album.cover} alt={song.title} width={80} height={80} className='rounded-tl-lg rounded-bl-lg mr-3'/>
            <h2 className='text-white font-semibold text-md'>{song?.title}</h2>
          </div>
          <p className='text-white font-semibold px-3'>{song?.artist.name}</p>
          <p className='text-white font-semibold px-3'>{song?.artist.name}</p>
          {/* <h4 className='text-white font-semibold px-3'>{song?.album.title}</h4> */}
          <div onClick={handlePlayClick} className='bg-transparent justify-center flex ml-auto mr-2 items-center h-10 w-10 rounded-lg cursor-pointer mt-1 hover:bg-yellow-400 transition-colors duration-300'>
              <GiPlayButton className="h-5 w-5 md:h-8 md:w-8 fill-white p-1" />
          </div>
          
      </div>
  )
}

export default PlaylistCard
