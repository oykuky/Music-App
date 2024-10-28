import React, { useEffect, useState } from 'react';
import SongCard from '@/components/SongCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMusic } from '@/redux/musicSlice';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useTranslations } from 'next-intl';

function Explore() {
  const t = useTranslations()
  const [artist, setArtist] = useState('');
  const [debouncedArtist, setDebouncedArtist] = useState('');

  // Redux dispatch fonksiyonu ile action (fetchMusic) çağrılır
  const dispatch = useDispatch();
  //store'dan state'e erişmek için
  const { songs, status, error } = useSelector((state) => state.music);
  console.log("song: " , songs)

 // Debounce: Kullanıcı her yazdığında 500ms bekler, sonra fetch işlemi başlar
 useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedArtist(artist);
  }, 500);

  return () => {
    clearTimeout(handler); // Yeni bir arama başladığında önceki timer temizlenir
  };
}, [artist]);

// Debounced artist ismi değiştiğinde fetch işlemi başlar
useEffect(() => {
  if (debouncedArtist) {
    dispatch(fetchMusic(debouncedArtist));
  }
}, [debouncedArtist, dispatch]);
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-y-auto">
      <div className='rounded-b-xl mx-12 mb-33 px-4 h-16 flex items-center gap-9 bg-purple-800'>
        <h3 className='text-white font-semibold text-[24px] ml-12'>{t("explore.search")}</h3>
        <input type="text" className='w-15 bg-transparent focus:outline-none focus:border-yellow-400 border-yellow-500 border-2 rounded-xl text-white text-[18px] px-3' value={artist} onChange={(e)=>setArtist(e.target.value)} />
      </div>
      <div className='flex-wrap flex justify-center gap-2'>
          {status === 'loading' && (
            <div className="flex justify-center items-center mt-10">
            <div className="loader">
             <AiOutlineLoading3Quarters className="animate-spin text-4xl"/>
            </div>
          </div> 
          )}
          {status === 'failed' && <div>Error: {error}</div>}
          {status === 'succeeded' && songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
      </div>
    </div>
  );
}

export default Explore;

// Debounce ile Arama: Kullanıcı her bir tuşa bastığında hemen API'yi çağırmak yerine, 500 ms bekleyip kullanıcının yazmayı bitirmesini bekliyoruz. Bu sayede gereksiz API çağrıları yapılmaz.