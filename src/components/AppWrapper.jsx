'use client'
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Player from "./Player";
import Sidebar from "./Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MusicPlayer from "./MusicPlayer";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { fetchFavorites } from '@/redux/musicSlice';

export default function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const isAuthPage = ["/login", "/register"].includes(router.pathname);

  useEffect(() => {
    if (session) {
      dispatch(fetchFavorites());
    }
  }, [session, dispatch]);

  return (
    <div className="flex flex-col min-h-screen h-screen bg-black">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        {!isAuthPage && <Navbar />}
        <div className="flex flex-cols h-full space-x-2">
          {!isAuthPage && <Sidebar />}
          <div className="w-full md:h-[calc(100vh-10rem)] h-[calc(100vh-8rem)] rounded-lg">
            {children}
          <MusicPlayer/>
          </div>
        </div>
        {!isAuthPage && <Player />}
      </GoogleOAuthProvider>
  </div>
  );
}

