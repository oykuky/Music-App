import { fetchPlaylist } from '@/redux/musicSlice';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

function PlaylistLibrariy() {
    const [playlistId, setPlaylistId] = useState('');
    const [debouncedPlaylist, setDebouncedPlaylist] = useState('');
    const dispatch = useDispatch();
    const { playlist, status, error } = useSelector((state) => state.music);
    console.log(debouncedPlaylist)
    console.log("playlistplaylist: " , playlist)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedPlaylist(playlistId);
        }, 500);
      
        return () => {
          clearTimeout(handler); // Yeni bir arama başladığında önceki timer temizlenir
        };
      }, [playlistId]);
      
      // Debounced playlist ismi değiştiğinde fetch işlemi başlar
      useEffect(() => {
        if (debouncedPlaylist) {
          dispatch(fetchPlaylist(debouncedPlaylist));
        }
      }, [debouncedPlaylist, dispatch]);
  
 
  return (
    <div className="w-full h-full bg-gradient-to-t from-black to-purple-600 bg-opacity-50 rounded-lg overflow-y-auto">
     

    </div>
  );
}

export default PlaylistLibrariy;
