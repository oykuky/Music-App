'use client'
import { playPause, setActiveSong } from '@/redux/playerSlice';
import Image from 'next/image'
import React from 'react'
import { GiPlayButton } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlaylist } from '@/redux/musicSlice';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { TiDeleteOutline } from "react-icons/ti";
import { styled } from '@mui/material/styles';
import Tooltip, {tooltipClasses } from '@mui/material/Tooltip';

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

function PlaylistCard({ song, data, i }) {
    const { data: session } = useSession()
    const dispatch = useDispatch();
    const router = useRouter();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };
    const handlePlaylistClick = () => {
        if (!session) {
            router.push('/login');
            return;
        }
        dispatch(togglePlaylist(song));
    };

    return (
        <div className='flex items-center mt-7 rounded-lg bg-purple-950 bg-opacity-60 w-full
       hover:bg-transparent h-[70px] md:h-[70px]
       cursor-pointer hover:shadow-xl transition-transform duration-300'>
            <div className='grid grid-cols-2 w-full gap-12 items-center '>
                <div className='flex flex-row items-center'>
                    <Image src={song?.album.cover} alt={song.title} width={70} height={70} className='rounded-tl-lg rounded-bl-lg shrink-0 mr-3' />
                    <div className='flex flex-col gap-y-1.5 items-start justify-start '>
                        <h2 className='text-white font-semibold text-md line-clamp-1'>{song?.title}</h2>
                        <p className='text-gray-300 font-semibold text-sm hover:underline line-clamp-1'>{song?.artist.name}</p>
                    </div>
                </div>
                {/* <p className='text-white font-semibold'>{song?.album.title}</p> */}
                <p className='text-white font-semibold px-5'>{song?.artist.name}</p>
            </div>
            <div onClick={handlePlayClick} className='bg-transparent justify-center flex flex-end mr-2 items-center h-10 w-10 rounded-lg cursor-pointer mt-1 hover:bg-gradient-to-l from-yellow-400 to-purple-600 transition-colors duration-300'>
                <GiPlayButton className="h-5 w-5 md:h-8 md:w-8 fill-white p-1" />
            </div>
            <BootstrapTooltip title="Delete" placement="top">
                <div onClick={handlePlaylistClick} className='justify-center flex ml-auto mr-2 items-center h-10 w-10 rounded-lg cursor-pointer hover:bg-gradient-to-l from-yellow-400 to-purple-600 transition-colors duration-300'>
                    <TiDeleteOutline className="h-5 w-5 md:h-8 md:w-8 fill-white p-1" />
                </div>
            </BootstrapTooltip>
        </div>
    )
}

export default PlaylistCard
