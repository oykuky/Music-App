import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select'
import SongCard from '@/components/SongCard';

function Explore() {
  const [songs, setSongs] = useState([]);
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
  return (
    <div className="w-full h-full bg-gradient-to-t from-green-900 via-yellow-600 to-pink-400 bg-opacity-50 rounded-lg overflow-y-auto">
      <div className='rounded-b-2xl mx-12 mb-33 px-4 h-24 flex items-center gap-9 bg-gray-950 opacity-55'>
          <h3 className='text-white font-semibold text-[24px] ml-12'>Chart by City</h3>
          <Select
          className="w-1/3"
          styles={customStyles} 
          // onInputChange={handleCityChange}
          // onChange={handleCitySelect}
          // options={cityOptions}
          placeholder="Select city"
        />
      </div>
      <div className='flex-wrap flex justify-center gap-2'>
      <SongCard/>
      <SongCard/>
      <SongCard/>
      <SongCard/>
      <SongCard/>
      <SongCard/>
      <SongCard/>
      <SongCard/>
      <SongCard/>
      <SongCard/>
      <SongCard/>
      <SongCard/>
      </div>
    </div>
  );
}

export default Explore;
