import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import realtorBGLogo from "../../../assets/realtorBG.svg";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

export const Navbar = () => {
  return (
    <div className="w-full flex flex-row justify-around gap-10 relative ">
      <NavigationMenu onValueChange={(value) => console.log(value)}>
        <NavigationMenuList className="gap-10">
          <NavigationMenuItem
            value="projects"
            id="projects"
            className="w-[120px]"
          >
            <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem
            value="property-list"
            id="property-list"
            className="w-[120px]"
          >
            <Link to="/property-list">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Property List
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <img src={realtorBGLogo} alt="realtor-logo" className="w-24" />
      <NavigationMenu>
        <NavigationMenuList className="gap-10">
          <NavigationMenuItem id="gallery" className="w-[120px]">
            <NavigationMenuTrigger>Gallery</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem id="Test" className="w-[120px]">
            <NavigationMenuTrigger>Test</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex flex-row items-center gap-4 right-0 top-6">
        <Avatar className="h-6 w-6">
          <AvatarImage
            src="
https://www.worldometers.info//img/flags/small/tn_bu-flag.gif"
          />
          <AvatarFallback>BG</AvatarFallback>
        </Avatar>
        <Avatar className="h-6 w-6">
          <AvatarImage />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
