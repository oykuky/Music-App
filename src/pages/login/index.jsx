'use client'
import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import LoginForm from '@/components/LoginForm';
import { useSession } from 'next-auth/react';



function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>{
      console.log(codeResp);
      router.push('/');
    },
    onError:(error)=>console.log(error)
  })

  return (
    <div className='bg-gray-900 min-h-screen flex justify-center items-center p-3'>
      <div className='w-full max-w-md rounded-xl bg-gradient-to-r from-green-800 via-yellow-700 to-pink-800 p-1'>
      <div className='bg-gray-900 rounded-lg p-8'>
         <h1 className='text-3xl font-bold text-center text-white mb-8'>Login</h1>
         <LoginForm/>
        <button  onClick={login} type="button" className="text-white bg-gray-900 border w-full justify-center border-amber-500 hover:bg-amber-400 focus:ring-4 font-medium rounded-lg text-m px-5 py-2.5 text-center inline-flex items-center me-2 my-2">
          <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path fillRule="fillRule" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="clipRule" />
          </svg>
          Sign in with Google
        </button>
       </div>
      </div>
    </div>
  )
}

export default Login
// React OAuth2 | Google kullanıldı