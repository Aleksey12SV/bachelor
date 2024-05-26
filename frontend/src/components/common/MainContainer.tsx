import { useOutlet } from "react-router-dom";
import { Navbar } from "../ui/navbar/Navbar";
import { ScrollArea } from "../ui/scroll-area";

export const MainContainer = () => {
  const outlet = useOutlet();
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div className="w-full flex py-4 px-8">
        <Navbar />
      </div>
      <div className="h-full w-full flex flex-1">
        <ScrollArea className="h-full w-full p-4">{outlet}</ScrollArea>
      </div>
    </div>
  );
};
