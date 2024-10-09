import SongCard from '@/components/SongCard';
import { fetchFavorites } from '@/redux/musicSlice';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


function Favorites() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const favorites = useSelector((state) => state.music.favorites); // Favorileri al
  useEffect(() => {
    if (session) {
      dispatch(fetchFavorites());
    }
  }, [session, dispatch]);
  const t = useTranslations()
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-y-auto">
        <div className='rounded-b-xl mx-12 px-4 h-16 flex items-center gap-9 bg-purple-800'>
          <h3 className='text-white font-semibold text-[24px] ml-12'>{t("favorites.title")}</h3>
        </div>

        <div className='flex-wrap flex justify-center gap-2'>
            {favorites.map((song, i) => (
              <SongCard key={song.id} song={song} i={i} data={[]} />
            ))}
        </div>
    </div>
  )
}

export default Favorites
