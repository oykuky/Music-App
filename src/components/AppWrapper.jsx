import Navbar from "./Navbar";
import Player from "./Player";
import Sidebar from "./Sidebar";

const AppWrapper = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen h-screen bg-black">
      <Navbar />
      <div className="flex flex-cols h-full space-x-2 p-2">
        <Sidebar />
        <div className="w-full h-[calc(100vh-8rem)] rounded-lg">
          {children}
        </div>
      </div>
      <Player />
    </div>
  );
};

export default AppWrapper;
// overflow-scroll