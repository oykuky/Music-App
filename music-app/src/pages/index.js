import Center from "@/components/Center";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";


export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar/>
     <div className="">
      <Center/>
      <Sidebar/>
     </div>
      <Player/>
    </div>
  );
}
