import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopCharts } from '../redux/musicSlice';

export default function Home() {

  const dispatch = useDispatch();
  const { topCharts, status, error } = useSelector((state) => state.music);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTopCharts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full h-full bg-gradient-to-t
     from-black to-purple-600 bg-opacity-50 rounded-lg"> 
       <div className='rounded-b-xl mx-12 px-4 h-24 flex items-center gap-9 bg-gray-950 opacity-55'>
          <h3 className='text-white font-semibold text-[24px] ml-12'>World Chart 🌎</h3>
          <div>
      <h1>Top Charts</h1>
      {/* <ul>
        {topCharts.map((track) => (
          <li key={track.id}>{track.title} - {track.artist}</li>
        ))}
      </ul> */}
    </div>

      </div>
    </div>
  );
}
