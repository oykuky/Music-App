'use client';
import Image from 'next/image'
import React from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { GiPlayButton } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import { playPause, setActiveSong } from '@/redux/playerSlice';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/redux/musicSlice';
import { useRouter } from 'next/navigation';

function SongCard({ song, data, i }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const favorites = useSelector((state) => state.music.favorites);
  const isFavorite = favorites.some((fav) => fav.id === song.id);

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handleFavoriteClick = () => {
    if (!session) {
      router.push('/login');
      return;
    }
    dispatch(toggleFavorite(song));
  };

  return (
    <div className='mx-3'>
      <div className='flex flex-col justify-between gap-1 mt-7 rounded-lg bg-black bg-opacity-60 text-gray-800 w-[315px] h-[470px] md:w-[250px] md:h-[425px] cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300'>
          <Image src={song?.album.cover} alt={song.title} width={250} height={200} className='w-full h-auto object-cover rounded-lg'/>
          <div className='flex justify-between px-1.5 mb-3 mt-1'>
            <div onClick={handleFavoriteClick} className={`${isFavorite ? 'bg-gradient-to-l from-yellow-400 to-purple-600' : 'bg-black'} rounded-full cursor-pointer items-center flex justify-center mt-1 ml-1 hover:bg-yellow-400 transition-colors duration-300 w-10 h-10`}>
              <MdFavoriteBorder className="h-5 w-5 md:h-8 md:w-8 p-1 fill-white"/>
            </div>
            <div onClick={handlePlayClick} className='bg-black justify-center flex items-center h-10 w-10 rounded-full cursor-pointer mt-1 hover:bg-yellow-400 transition-colors duration-300'>
              <GiPlayButton className="h-5 w-5 md:h-8 md:w-8 fill-white p-1" />
            </div>
          </div>
          <h2 className='text-white font-bold text-xl px-3'>{song?.title}</h2>
          <p className='text-white font-semibold px-3 mb-3'>{song?.artist.name}</p>
          <div className='justify-center flex ml-auto mr-2 mb-2 items-center h-10 w-10 rounded-full cursor-pointer hover:bg-gradient-to-l from-yellow-400 to-purple-600 transition-colors duration-300'>
              <IoMdAdd className="h-5 w-5 md:h-8 md:w-8 fill-white p-1" />
          </div>

           {/* <div className='justify-center flex flex-end mr-2 items-center h-10 w-10 rounded-full cursor-pointer hover:bg-gradient-to-l from-yellow-400 to-purple-600 transition-colors duration-300'>
            {isPlaylist ? 
            (<TiTick className="h-5 w-5 md:h-8 md:w-8 fill-white p-1" />)
            :
            (<IoMdAdd className="h-5 w-5 md:h-8 md:w-8 fill-white p-1" />)
            }
      </div> */}
      </div>
    </div>
  );
}

export default SongCard;

