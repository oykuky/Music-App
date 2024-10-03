import PlaylistCard from '@/components/PlaylistCard';
import { fetchFavorites } from '@/redux/musicSlice';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';


//favorites yerine playlist olucak
function PlaylistLibrariy() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const favorites = useSelector((state) => state.music.favorites); // Favorileri al
  useEffect(() => {
    if (session) {
      dispatch(fetchFavorites());
    }
  }, [session, dispatch]);// Favorileri al

  return (
    <div className="w-full h-full bg-gradient-to-t from-black to-purple-600 bg-opacity-50 rounded-lg overflow-y-auto">
     <div className='rounded-b-xl mx-12 px-4 h-16 flex items-center gap-4 bg-gray-950 opacity-55'>
          <h3 className='text-white font-semibold text-[24px] ml-12'>Playlist</h3>
      </div>

      <div className='flex-col flex justify-center items-center lg:px-16 md:px-12 sm:px-10 px-8'>
            {favorites.map((song, i) => (
              <PlaylistCard key={song.id} song={song} i={i} data={[]} />
            ))}
      </div>
    
    </div>
  );
}

export default PlaylistLibrariy;
