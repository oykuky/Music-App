import Navbar from "./Navbar";
import Player from "./Player";
import Sidebar from "./Sidebar";

const AppWrapper = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen h-screen bg-fuchsia-600">
      <Navbar />
      <div className="flex flex-cols h-full space-x-2 bg-primary p-2">
        <Sidebar />
        <div className="w-full h-[calc(100vh-8rem)] overflow-scroll rounded-lg">
          {children}
        </div>
      </div>
      <Player />
    </div>
  );
};

export default AppWrapper;
