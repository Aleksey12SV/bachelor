import { useOutlet } from "react-router-dom";
import { Navbar } from "../ui/navbar/Navbar";
import { useKeycloak } from "../auth/KeycloakProvider";
import { useEffect, useRef } from "react";

export const MainContainer = () => {
  const outlet = useOutlet();
  const isInitialized = useRef(false);
  const { initKeycloak } = useKeycloak();

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    initKeycloak();
  }, [initKeycloak]);

  return (
    <div className="min-h-screen max-h-screen flex flex-col">
      <div className="w-full flex py-4 px-8 shrink-0">
        <Navbar />
      </div>
      <div id="main-container" className="w-full flex flex-auto overflow-hidden">
        {outlet}
      </div>
    </div>
  );
};
