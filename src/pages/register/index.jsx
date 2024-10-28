import RegisterForm from '@/components/RegisterForm'
import { locales } from '@/constants/locales';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

function Register() {
  const router = useRouter();
  const locale = router.locale;
  const language = locale === "tr" ? "EN" : "TR";
  const otherLocale = locales.filter((l)=>l.locale !== locale)[0];
  const t = useTranslations()
  return (
    <div className='bg-gray-900 min-h-screen flex justify-center items-center p-4'>
      <div className='w-full max-w-md rounded-xl bg-transparent border-[2px] border-purple-700 p-1'>
        <div className='bg-gray-900 rounded-lg p-8'>
          <h1 className='text-3xl font-bold text-center text-white mb-8'>{t("register.title")}</h1>
          <RegisterForm />
        </div>
      </div>
      <Link className="mt-auto flex rounded-lg items-center justify-center bg-gradient-to-r from-green-600 via-yellow-700 to-pink-800 w-10 h-10 font-semibold text-white text-center"
        href={router.pathname}
        locale={otherLocale.locale}
      >{language}
      </Link>
    </div>
  )
}

export default Register