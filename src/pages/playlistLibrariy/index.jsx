import PlaylistCard from '@/components/PlaylistCard';
import { fetchPlaylist } from '@/redux/musicSlice';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';


//favorites yerine playlist olucak
function PlaylistLibrariy() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const {status,error} = useSelector((state) => state.music); 
  const playlist = useSelector((state) => state.music.playlist); 
  const t = useTranslations()

  useEffect(() => {
    if (session) {
      dispatch(fetchPlaylist());
    }
  }, [session, dispatch])

  return (
    <div className="w-full h-full bg-gradient-to-t from-black to-purple-600 bg-opacity-50 rounded-lg overflow-y-auto">
     <div className='rounded-b-xl mx-12 px-4 h-16 flex items-center gap-4 bg-gray-950 opacity-55'>
          <h3 className='text-white font-semibold text-[24px] ml-12'>{t("library.title")}</h3>
      </div>

      {status === 'loading' && (
            <div className="flex justify-center items-center mt-10">
            <div className="loader">
             <AiOutlineLoading3Quarters className="animate-spin text-4xl"/>
            </div>
          </div>
          )}
          {status === 'failed' && <div>Error: {error}</div>}
          {status === 'succeeded' && ( 
            <div className='flex-col flex justify-center items-center lg:px-16 md:px-12 sm:px-10 px-8'>
            {playlist.map((song, i) => (
              <PlaylistCard key={song.id} song={song} i={i} data={[]} />
            ))}
           </div>)
           
          }

     
    
    </div>
  );
}

export default PlaylistLibrariy;
