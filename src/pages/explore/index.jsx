import React, { useState } from 'react';
import Select from 'react-select';
import SongCard from '@/components/SongCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMusic } from '@/redux/musicSlice';

function Explore() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const dispatch = useDispatch();
  const { songs, status, error } = useSelector((state) => state.music);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#755',
      borderRadius: '16px',
      borderColor: '#755',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#755',
    }),
  };

  const handleArtistChange = (selectedOption) => {
    setSelectedArtist(selectedOption);
    if (selectedOption) {
      dispatch(fetchMusic(selectedOption.value));
    }
  };

  const artistOptions = [
    { value: 'eminem', label: 'Eminem' },
    { value: 'rihanna', label: 'Rihanna' },
    { value: 'coldplay', label: 'Coldplay' },
    // Daha fazla sanatçı ekleyebilirsiniz
  ];

  return (
    <div className="w-full h-full bg-gradient-to-t from-black to-purple-600 bg-opacity-50 rounded-lg overflow-y-auto">
      <div className='rounded-b-xl mx-12 mb-33 px-4 h-24 flex items-center gap-9 bg-gray-950 opacity-55'>
        <h3 className='text-white font-semibold text-[24px] ml-12'>Search by Artist</h3>
        <Select
          className="w-1/3"
          styles={customStyles}
          onChange={handleArtistChange}
          options={artistOptions}
          placeholder="Select artist"
        />
      </div>
      <div className='flex-wrap flex justify-center gap-2'>
        {status === 'loading' && <div>Loading...</div>}
        {status === 'failed' && <div>Error: {error}</div>}
        {status === 'succeeded' && songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}

export default Explore;