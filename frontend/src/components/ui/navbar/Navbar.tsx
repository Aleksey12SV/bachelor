import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import RealtorBGLogo from "../../../assets/realtorBG.svg?react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useKeycloak } from "@/components/auth/KeycloakProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

export const Navbar = () => {
  const navigate = useNavigate();
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const { authenticated, logout } = useKeycloak();
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "bg" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };
  return (
    <div className="w-full flex flex-row justify-around gap-10 relative shrink-0">
      <NavigationMenu onValueChange={(value) => navigate(value)}>
        <NavigationMenuList className="gap-10">
          <NavigationMenuItem
            value="projects"
            id="projects"
            className="w-[120px]"
          >
            <Link className={navigationMenuTriggerStyle()} to="/projects">
              Projects
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem
            value="property-list"
            id="property-list"
            className="w-[120px]"
          >
            <Link className={navigationMenuTriggerStyle()} to="/property-list">
              Property List
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <RealtorBGLogo
              className="w-24 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </TooltipTrigger>
          <TooltipContent asChild>
            <div className="!z-50 p-2 rounded shadow-xl border border-neutral-200 bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
              Return to homepage
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <NavigationMenu>
        <NavigationMenuList className="gap-10">
          <NavigationMenuItem
            value="gallery"
            id="gallerry"
            className="w-[120px]"
          >
            <Link className={navigationMenuTriggerStyle()} to="/gallery">
              Galery
            </Link>
          </NavigationMenuItem>
          {authenticated ? (
            <NavigationMenuItem id="Sellers" className="w-[120px]">
              <Link className={navigationMenuTriggerStyle()} to="/sellers">
                Sellers
              </Link>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem id="Contacts" className="w-[120px]">
              <Link className={navigationMenuTriggerStyle()} to="/contacts">
                Contacts
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="absolute flex flex-row items-center gap-4 right-0 top-6">
        <Avatar onClick={handleChangeLanguage} className="h-6 w-6">
          <AvatarImage
            src={`
https://www.worldometers.info//img/flags/small/tn_${
              currentLanguage === "bg" ? "uk" : "bu"
            }-flag.gif`}
          />
          <AvatarFallback>BG</AvatarFallback>
        </Avatar>
        {authenticated && (
          <Avatar className="h-6 w-6" onClick={logout}>
            <AvatarImage />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};
