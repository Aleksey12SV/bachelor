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

const KeycloakContext = createContext<{
  keycloakInstance: Keycloak | null;
  authenticated: boolean;
  initKeycloak: () => void;
}>({ keycloakInstance: null, authenticated: false, initKeycloak: () => {} });

export const KeycloakProvider = ({ children }: { children: ReactNode }) => {
  const [keycloakInstance, setKeycloakInstance] = useState<Keycloak | null>(
    null
  );
  const [authenticated, setAuthenticated] = useState(false);

  const initKeycloak = useCallback(() => {
    keycloak
      .init({onLoad: 'login-required'})
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

  return (
    <KeycloakContext.Provider
      value={{ keycloakInstance, authenticated, initKeycloak }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => {
  return useContext(KeycloakContext);
};
