import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import "./index.css";
import { KeycloakProvider } from "./components/auth/KeycloakProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <KeycloakProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} fallbackElement={null} />
      </QueryClientProvider>
    </KeycloakProvider>
  );
}

export default App;
