import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Player from "./Player";
import Sidebar from "./Sidebar";

const AppWrapper = ({ children }) => {
  const router = useRouter();
  const isAuthPage = ["/login", "/register"].includes(router.pathname); // Giriş veya Kayıt sayfasıysa

  return (
    <div className="flex flex-col min-h-screen h-screen bg-black">
      {!isAuthPage && <Navbar />}
      <div className="flex flex-cols h-full space-x-2 p-2">
        {!isAuthPage && <Sidebar />}
        <div className="w-full h-[calc(100vh-8rem)] rounded-lg">
          {children}
        </div>
      </div>
      {!isAuthPage && <Player />}
    </div>
  );
};

export default AppWrapper;
