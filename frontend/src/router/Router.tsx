import { MainContainer } from "@/components/common/MainContainer";
import Contacts from "@/pages/contacts/Contacts";
import Gallery from "@/pages/gallery/Gallery";
import { HomePage } from "@/pages/home-page/HomePage";
import Projects from "@/pages/projects/Projects";
import PropertyList from "@/pages/property-list/PropertyList";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainContainer />}>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="projects" element={<Projects />} />
        <Route path="property-list/:id" element={<PropertyList />} />
        <Route path="property-list" element={<PropertyList />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contacts" element={<Contacts />} />
        {/* <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} loader={redirectIfUser} />
          <Route path="logout" action={logoutUser} />
        </Route> */}
      </Route>
    </>
  )
);
