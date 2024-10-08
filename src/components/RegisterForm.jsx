import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function RegisterForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const t = useTranslations()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData);
    
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObj),
    });
  
    const data = await response.json();
  
    if (data.success) {
      router.push('/');
    } else if (data.error) {
      alert(data.error);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      localStorage.setItem('userId', session.user.email);
    }
  }, [session]);

  return (
    <div className="w-full max-w-md">
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder={t("register.username")} 
          className='rounded-lg h-12 px-4 bg-gray-800 text-gray-200 border border-gray-700 focus:border-yellow-400 focus:outline-none'
        />
        <input 
          type="email" 
          name="email" 
          placeholder={t("register.email")} 
          className='rounded-lg h-12 px-4 bg-gray-800 text-gray-200 border border-gray-700 focus:border-yellow-400 focus:outline-none'
        />
        <input 
          type="password" 
          name="password" 
          placeholder={t("register.password")}
          className='rounded-lg h-12 px-4 bg-gray-800 text-gray-200 border border-gray-700 focus:border-yellow-400 focus:outline-none'
        />
        <input 
          type="password" 
          name="passwordRepeat" 
          placeholder={t("register.confirmpass")}
          className='rounded-lg h-12 px-4 bg-gray-800 text-gray-200 border border-gray-700 focus:border-yellow-400 focus:outline-none'
        />
        <button 
          type="submit" 
          className="text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold rounded-lg text-sm px-5 py-3 text-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          {t("register.button")}
        </button>
        <Link 
          className='text-sm text-gray-300 hover:text-white text-center' 
          href="/login"
        >
          {t("register.haveAccQ")} <span className='font-bold hover:text-yellow-400'>{t("register.span")}</span>
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;