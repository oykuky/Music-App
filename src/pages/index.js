import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';


export default function Home() { 
  const t = useTranslations();
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg"> 
       <div className='rounded-b-xl mx-12 px-4 h-24 flex items-center gap-9 bg-purple-800'>
          <h3 className='text-white font-semibold text-[24px] ml-12'>{t("home.greeting")} </h3>
          <div>
      </div>
      </div>
    </div>
  );
}

