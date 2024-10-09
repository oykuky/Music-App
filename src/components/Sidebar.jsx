import Link from "next/link";
import React from "react";
import { BiLibrary } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { useRouter } from "next/router";
import { locales } from "@/constants/locales";
import { useTranslations } from "next-intl";


function Sidebar() {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;
  const locale = router.locale;
  const language = locale === "tr" ? "EN" : "TR";
  const otherLocale = locales.filter((l)=>l.locale !== locale)[0];
  const t = useTranslations()
  
  return(
   <div className="bg-black bg-opacity-50 h-full w-1/5 rounded-lg text-white font-semibold gap-3 flex flex-col">
      <Link href="/" 
         className={`flex flex-row gap-2 items-center  ${isActive("/") ? "text-yellow-300" : "text-white"}
         rounded-full p-2 m-2`}>
        <IoIosHome className='h-8 w-8'/>
        <h3>{t("sidebar.home")}</h3>
      </Link>
      <Link href="/playlistLibrariy" className={`flex flex-row gap-2 items-center  ${isActive("/playlistLibrariy") ? "text-yellow-300" : "text-white"}
        rounded-full p-2 m-2`}>
        <BiLibrary  className='h-8 w-8' />
        <h3>{t("sidebar.library")}</h3>
      </Link>
      <Link href="/favorites"  className={`flex flex-row gap-2 items-center  ${isActive("/favorites") ? "text-yellow-300" : "text-white"}
        rounded-full p-2 m-2`}>
        <MdFavoriteBorder  className='h-8 w-8' />
        <h3>{t("sidebar.favorites")}</h3>
      </Link>
      <Link href="/explore" className={`flex flex-row gap-2 items-center  ${isActive("/explore") ? "text-yellow-300" : "text-white"}
        rounded-full p-2 m-2`}>
        <MdOutlineExplore  className='h-8 w-8' />
        <h3>{t("sidebar.explore")}</h3>
      </Link>
      <Link className="p-2 m-2 mt-auto rounded-lg items-center justify-center flex flex-start hover:bg-purple-600 w-10 h-10 font-semibold text-white text-center"
        href={router.pathname}
        locale={otherLocale.locale}
      >{language}
      </Link>
  </div>  
  );
}

export default Sidebar;
