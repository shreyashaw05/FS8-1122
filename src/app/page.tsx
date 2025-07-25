import { Camera } from "lucide-react";
import Navbar from "./components/Navbar";
import Panel from "./components/Panel";
import Player from "./components/Player";
import Timeline from "./components/CameraPanel";
import CameraRack from "./components/CameraPanel";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="p-4">
      <Panel/>
      <Player/>
      <CameraRack/>
      </div>
      
    </div>
  );
}

// TODO: try out the optional section
// TODO: change the logo