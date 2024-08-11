import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import "./index.css";
import { KeycloakProvider } from "./components/auth/KeycloakProvider";
import keycloak from "./lib/Keycloak";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App() {
  return (
    <KeycloakProvider keycloak={keycloak}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} fallbackElement={null} />
      </QueryClientProvider>
    </KeycloakProvider>
  );
}

export default App;
