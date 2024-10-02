'use client'
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'


function LoginForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target); 
    const username = formData.get('username');
    const password = formData.get('password');
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false, // Bu ayar ile yönlendirme yapılmaz
      });

      if (result?.error) {
        alert(result.error); // Giriş hatasını göster
        console.log("result", result);
      } else {  
        router.push('/'); // Başarılı girişten sonra yönlendirme
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong');
    }
  };
  return (
    <div>
        <form className='flex flex-col gap-10' onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" className='rounded-lg h-12 text-center bg-gray-900 text-white'></input>
            <input type="password" name="password" placeholder="Password" className='rounded-lg h-12 text-center bg-gray-900 text-white'></input>
            <button type="submit" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold rounded-full text-m px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Login</button>
            <Link className='text-lg text-white' href="/register">
            {"Don't have an account?"} <b className='hover:text-pink-600 text-[20px]'>Register</b>
            </Link>
        </form>
    </div>
  )
}

export default LoginForm
