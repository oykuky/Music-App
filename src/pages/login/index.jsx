'use client'
import React from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import LoginForm from '@/components/LoginForm';


function Login() {
  const router = useRouter();
  const login = useGoogleLogin({
    onSuccess:(codeResp)=>{
      console.log(codeResp)
      router.push('/');
    },
    onError:(error)=>console.log(error)
  })

  return (
    <div className='bg-gray-800 bg-opacity-50 h-screen flex justify-center items-center'>
      <div className='flex flex-col w-[600px] h-[600px] gap-20 text-center rounded-lg bg-gradient-to-r
       from-green-900 via-yellow-600 to-pink-400 items-center justify-center'>
       <LoginForm/>
        <button  onClick={login} type="button" className="text-white bg-gray-900 hover:bg-amber-400 focus:ring-4 font-medium rounded-lg text-m px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
          <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path fillRule="fillRule" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="clipRule" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Login
// React OAuth2 | Google kullanıldı