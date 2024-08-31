import RegisterForm from '@/components/RegisterForm'
import React from 'react'

function Register() {
  return (
    <div className='bg-gray-800 bg-opacity-50 h-screen flex justify-center items-center'>
      <div className='flex flex-col w-[600px] h-[600px] gap-20 text-center rounded-lg bg-gradient-to-r
      from-green-900 via-yellow-600 to-pink-400 items-center justify-center'>
        <RegisterForm/>
      </div>
  </div>

  )
}

export default Register
