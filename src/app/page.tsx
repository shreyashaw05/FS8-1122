import Navbar from "./components/Navbar";
import Panel from "./components/Panel";

export default function Home() {
  return (
    <div>
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-64 pointer-events-none z-[-2]"
        style={{
          background: "radial-gradient(ellipse at center top, #fcce19 0%, transparent 70%)",
          opacity: 0.6,
        }}
      />

      <Navbar/>
      <Panel/>
    </div>
  );
}

// TODO: try out the optional section
// TODO: change the logo