import keycloak from "@/lib/Keycloak";
import { interceptRequestAuthToken } from "@/lib/axios";
import Keycloak from "keycloak-js";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { Roles } from "./Roles";

const KeycloakContext = createContext<{
  keycloakInstance: Keycloak | null;
  authenticated: boolean;
  initKeycloak: () => void;
  hasRole: (roles: Roles[]) => boolean;
}>({
  keycloakInstance: null,
  authenticated: false,
  initKeycloak: () => {},
  hasRole: () => false,
});

export const KeycloakProvider = ({ children }: { children: ReactNode }) => {
  const [keycloakInstance, setKeycloakInstance] = useState<Keycloak | null>(
    null
  );
  const [authenticated, setAuthenticated] = useState(false);

  const initKeycloak = useCallback(() => {
    keycloak
      .init({ onLoad: "login-required" })
      .then((auth) => {
        setKeycloakInstance(keycloak);
        setAuthenticated(auth);
        if (auth) {
          localStorage.setItem("token", keycloak.token ?? "");
          localStorage.setItem("refreshToken", keycloak.refreshToken ?? "");
          interceptRequestAuthToken(keycloak);
        }
      })
      .catch((err) => {
        console.error("Failed to initialize Keycloak", err);
      });
  }, []);

  const hasRole = useCallback(
    (roles: Roles[]) => {
      if (authenticated) {
        return roles.some((r) => keycloak.hasResourceRole(r));
      }
      return false;
    },
    [authenticated]
  );

  return (
    <KeycloakContext.Provider
      value={{ keycloakInstance, authenticated, initKeycloak, hasRole }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => {
  return useContext(KeycloakContext);
};
