import Image from 'next/image'
import React, { useState } from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { GiPlayButton } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveSong } from '@/redux/playerSlice';
import { toggleFavoriteAsync } from '@/lib/action';

function SongCard({song,data,i}) {
  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state)=>state.player)
  const favorites = useSelector((state)=>state.music.favorites)
  const isFavorite = favorites.some((fav)=> fav.id === song.id)

  const handlePlayClick = ()=>{
    dispatch(setActiveSong ({song,data,i }));
    dispatch(playPause(true))
  }
  const handleFavoriteClick = () => {
    dispatch(toggleFavoriteAsync(song)); // Şarkıyı favorilere ekle/çıkar
  };
  return (
    <div className='mx-3'>
      <div className='flex flex-col justify-between gap-2 mt-7 rounded-lg bg-black bg-opacity-60 text-gray-800 w-[305px] h-[450px] md:w-[250px] md:h-[410px] cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300'>
        <Image src={song?.album.cover} alt={song.title} width={250} height={200} className='w-full h-auto object-cover rounded-lg'/>
        <div className='flex justify-between px-1.5 mb-3'>
          <div  onClick={handleFavoriteClick} className={`${isFavorite ? 'bg-yellow-400' : 'bg-black' } rounded-full cursor-pointer items-center flex justify-center mt-1 ml-1 hover:bg-yellow-400 transition-colors duration-300 w-10 h-10`}>
            <MdFavoriteBorder className="h-5 w-5 md:h-8 md:w-8 fill-white p-1"/>
          </div>
          <div onClick={handlePlayClick} className='bg-black justify-center flex items-center h-10 w-10 rounded-full cursor-pointer mt-1 hover:bg-yellow-400 transition-colors duration-300'>
            <GiPlayButton className="h-5 w-5 md:h-8 md:w-8 fill-white p-1" />  
          </div>
        </div>
        <h2 className='text-white font-bold text-xl px-3'>{song?.title_short}</h2>
        <p className='text-white font-semibold px-3 mb-3'>{song?.artist.name}</p>
      </div>
    </div>
  )
}

export default SongCard
