import { useOutlet } from "react-router-dom";
import { Navbar } from "../ui/navbar/Navbar";

export const MainContainer = () => {
  const outlet = useOutlet();
  return (
    <div className="min-h-screen max-h-screen flex flex-col overflow-hidden">
      <div className="w-full flex py-4 px-8">
        <Navbar />
      </div>
      <div id='main-container' className="w-full h-full flex flex-auto overflow-hidden">{outlet}</div>
    </div>
  );
};