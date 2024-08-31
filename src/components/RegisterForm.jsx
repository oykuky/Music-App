import { register } from '@/lib/action';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function RegisterForm() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Formun varsayılan yeniden yüklenme davranışını engelle
    const formData = new FormData(event.target); // Form verilerini al
    const response = await register(formData);
    console.log(formData);
    if (response.success) {
      router.push('/'); // Başarılı kayıt işleminden sonra ana sayfaya yönlendir
    } else if (response.message) {
      alert(response.message); // Hata mesajı göster
    }
  };
  return (
    <div>
      <form className='flex flex-col gap-10' onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" className='rounded-lg h-12 text-center bg-gray-900 text-gray-200'></input>
            <input type="email" name="email" placeholder="Email" className='rounded-lg h-12 text-center bg-gray-900 text-gray-200' ></input>
            <input type="password" name="password" placeholder="Password" className='rounded-lg h-12 text-center bg-gray-900 text-gray-200'></input>
            <input type="password" name="passwordRepeat" placeholder="Password Again" className='rounded-lg h-12 text-center bg-gray-900 text-gray-200'></input>
            <button type="submit" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold rounded-full text-m px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Register</button>
            <Link className='text-lg text-white' href="/login">
            {"Have an account?"} <b className='hover:text-pink-600 text-[20px]'>Login</b>
            </Link>
        </form> 
    </div>
  )
}

export default RegisterForm
