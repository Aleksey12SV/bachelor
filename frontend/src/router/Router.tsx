import { MainContainer } from "@/components/common/MainContainer";
import { HomePage } from "@/pages/home-page/HomePage";
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
        <Route path={`/`} element={<Navigate to={`/home`} />} />
        <Route path={`/home`} element={<HomePage />} />
        {/* <Route path="contact" element={<Contact />} /> */}
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
