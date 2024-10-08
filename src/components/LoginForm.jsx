'use client'
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

function LoginForm() {
  const router = useRouter();
  const t = useTranslations()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert(result.error);
        console.log("result", result);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder={t("login.username")}
          className='rounded-lg h-12 px-4 bg-gray-800 text-gray-200 border border-gray-700 focus:border-yellow-400 focus:outline-none'
        />
        <input 
          type="password" 
          name="password" 
          placeholder={t("login.password")} 
          className='rounded-lg h-12 px-4 bg-gray-800 text-gray-200 border border-gray-700 focus:border-yellow-400 focus:outline-none'
        />
        <button 
          type="submit" 
          className="text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold rounded-lg text-sm px-5 py-3 text-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          {t("login.loginButton")}
        </button>
        <Link 
          className='text-sm text-gray-300 hover:text-white text-center' 
          href="/register"
        >
          {t("login.haveAccQ")} <span className='font-bold hover:text-yellow-400'>{t("login.span")}</span>
        </Link>
      </form>
    </div>
  )
}

export default LoginForm