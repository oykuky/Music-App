import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Player from "./Player";
import Sidebar from "./Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from 'next-auth/react'



const AppWrapper = ({ children }) => {
  const router = useRouter();
  const isAuthPage = ["/login", "/register"].includes(router.pathname); // Giriş veya Kayıt sayfasıysa
  return (
    <div className="flex flex-col min-h-screen h-screen bg-black">
      <SessionProvider>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          {!isAuthPage && <Navbar />}
          <div className="flex flex-cols h-full space-x-2">
            {!isAuthPage && <Sidebar />}
            <div className="w-full h-[calc(100vh-8rem)] rounded-lg">
              {children}
            </div>
          </div>
          {!isAuthPage && <Player />}
        </GoogleOAuthProvider>;
      </SessionProvider>
    </div>
  );
};

export default AppWrapper;
