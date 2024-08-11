import { MainContainer } from "@/components/common/MainContainer";
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
        <Route path="/" element={<Navigate replace to={`/home`} />} />
        <Route path="home" element={<HomePage />} />
        <Route path="projects" element={<Projects />} />
        <Route path="property-list" element={<PropertyList />} />

        {/* <Route
          path="dashboard"
          element={<Dashboard />}
          loader={({ request }) =>
            fetch("/api/dashboard.json", {
              signal: request.signal,
            })
          }
        /> */}
        {/* <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} loader={redirectIfUser} />
          <Route path="logout" action={logoutUser} />
        </Route> */}
      </Route>
    </>
  )
);
