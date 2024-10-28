"use client";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MusicPlayer from "./MusicPlayer";

export default function AppWrapper({ children }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const router = useRouter();
  const isAuthPage = useMemo(
    () => ["/login", "/register"].includes(router.pathname),
    [router.pathname],
  );

  return (
    <div className="flex h-screen min-h-screen flex-col bg-black ">
      <GoogleOAuthProvider clientId={clientId}>
        {!isAuthPage && <Navbar />}
        <div className="flex-cols flex h-full space-x-2">
          {!isAuthPage && <Sidebar />}
          <div className="h-[calc(100vh-5rem)] rounded-lg w-full md:h-[calc(100vh-10rem)]">
            {/* {children}
            {!isAuthPage && <MusicPlayer/>} */}
            <div className="h-[calc(100vh-7rem)] rounded-xl w-full md:h-[calc(100vh-6rem)] flex flex-col">
              <div className="flex-grow overflow-y-auto">
                {children}
              </div>
              {!isAuthPage && <MusicPlayer />}
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
