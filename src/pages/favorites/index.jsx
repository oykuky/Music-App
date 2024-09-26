import SongCard from '@/components/SongCard';
import React from 'react'
import { useSelector } from 'react-redux';


function Favorites() {
  const favorites = useSelector((state) => state.music.favorites); // Favorileri al
  return (
    <div className="w-full h-full bg-gradient-to-t from-black to-purple-600 bg-opacity-50 rounded-lg overflow-y-auto">
        <div className='rounded-b-xl mx-12 px-4 h-24 flex items-center gap-9 bg-gray-950 opacity-55'>
          <h3 className='text-white font-semibold text-[24px] ml-12'>Favorites</h3>
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
