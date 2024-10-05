import RegisterForm from '@/components/RegisterForm'
import React from 'react'

function Register() {
  return (
    <div className='bg-gray-900 min-h-screen flex justify-center items-center p-4'>
      <div className='w-full max-w-md rounded-xl bg-gradient-to-r from-green-800 via-yellow-700 to-pink-800 p-1'>
        <div className='bg-gray-900 rounded-lg p-8'>
          <h1 className='text-3xl font-bold text-center text-white mb-8'>Register</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default Register