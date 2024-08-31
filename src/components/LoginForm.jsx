import Link from 'next/link'
import React from 'react'

function LoginForm() {
    
  return (
    <div>
        <form className='flex flex-col gap-10' onSubmit="">
            <input type="text" name="username" placeholder="Username" className='rounded-lg h-12 text-center bg-gray-900'></input>
            <input type="password" name="password" placeholder="Password" className='rounded-lg h-12 text-center bg-gray-900'></input>
            <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold rounded-full text-m px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Login</button>
            <Link className='text-lg text-white' href="/register">
            {"Don't have an account?"} <b className='hover:text-pink-600 text-[20px]'>Register</b>
            </Link>
        </form>
    </div>
  )
}

export default LoginForm
