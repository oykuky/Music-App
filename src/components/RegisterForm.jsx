import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function RegisterForm() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // Form verilerini alır ve bir FormData nesnesine dönüştürür.
    const formDataObj = Object.fromEntries(formData);  // FormData nesnesini bir nesneye çevirir.
    // API'ye POST isteği gönderir, form verilerini JSON formatında gönderir.
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // İçerik türü JSON olarak ayarlanır.
      },
      body: JSON.stringify(formDataObj),  // Form verileri JSON formatına dönüştürülerek isteğin gövdesine eklenir
    });
  
    const data = await response.json();  // API'den dönen yanıtı JSON formatında çözer.
  
    if (data.success) {
      router.push('/');
    } else if (data.error) {
      alert(data.error);
    }
  };
  return (
    <div>
      <form className='flex flex-col gap-10' onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" className='rounded-lg h-12 text-center bg-gray-900 text-gray-200' />
        <input type="email" name="email" placeholder="Email" className='rounded-lg h-12 text-center bg-gray-900 text-gray-200' />
        <input type="password" name="password" placeholder="Password" className='rounded-lg h-12 text-center bg-gray-900 text-gray-200' />
        <input type="password" name="passwordRepeat" placeholder="Password Again" className='rounded-lg h-12 text-center bg-gray-900 text-gray-200' />
        <button type="submit" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold rounded-full text-m px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Register</button>
        <Link className='text-lg text-white' href="/login">
          {"Have an account?"} <b className='hover:text-pink-600 text-[20px]'>Login</b>
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;

