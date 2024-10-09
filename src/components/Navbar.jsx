import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

function Navbar() {
  const [search, setSearch] = useState();
  const router = useRouter();
  const { data: session } = useSession();
  const t = useTranslations();
  const logOut = async () => {
    await signOut();
  };
  return (
    <div className="my-2 flex h-20 items-center justify-between bg-black bg-opacity-50 px-4 md:px-3">
      <div>
        <img
          src="/logo.svg"
          alt="logo"
          className="w-30 h-30 rounded-full bg-yellow-500 p-1"
        ></img>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => router.push("/")}
          className="mr-3 cursor-pointer items-center rounded-full bg-gray-900 p-3"
        >
          <IoIosHome className="text-[28px] text-gray-500 hover:text-white" />
        </button>
        <div className="flex h-full items-center rounded-full bg-gray-900 px-5 sm:w-80 lg:w-[450px]">
          <IoSearch className="text-[25px] text-gray-500 hover:text-white" />
          <input
            type="text"
            name="search"
            value={search}
            placeholder={t("navbar.search")}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent p-3 text-white outline-none"
          ></input>
        </div>
      </div>
      <div>
        {session ? (
          <div className="flex items-center justify-center gap-2">
            <div>
              <button
                onClick={logOut}
                className="text-m me-2 rounded-full border-2 border-purple-500 from-yellow-400 to-purple-600 px-5 py-2.5 text-center font-semibold text-white transition-all hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-yellow-300 "
              >
                {t("navbar.logout")}
              </button>
            </div>
            <div className="rounded-full">
              <Image
                src="/noavatar.png"
                alt="profileimg"
                width={40}
                height={40}
                className="cursor-pointer rounded-full"
              />
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => router.push("/login")}
              className="text-m mb-2 me-2 rounded-full border-2 border-purple-500 from-yellow-400 to-purple-600 px-5 py-2.5 text-center font-semibold text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-yellow-300 "
            >
              {t("navbar.login")}
            </button>
            )
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
