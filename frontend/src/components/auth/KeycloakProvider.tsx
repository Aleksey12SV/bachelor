import { axiosInstance, interceptRequestAuthToken } from "@/lib/axios";
import Keycloak from "keycloak-js";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { Roles } from "./Roles";

const KeycloakContext = createContext<{
  keycloakInstance: Keycloak | null;
  authenticated: boolean;
  initKeycloak: () => void;
  hasRole: (roles: Roles[]) => boolean;
  logout: () => void;
}>({
  keycloakInstance: null,
  authenticated: false,
  initKeycloak: () => {},
  hasRole: () => false,
  logout: () => null,
});

export const KeycloakProvider = ({
  children,
  keycloak,
}: {
  children: ReactNode;
  keycloak: Keycloak;
}) => {
  const [authenticated, setAuthenticated] = useState(false);

  const initKeycloak = useCallback(() => {
    keycloak
      .init({ onLoad: "check-sso" })
      .then((auth) => {
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
  }, [keycloak]);

  const hasRole = useCallback(
    (roles: Roles[]) => {
      if (authenticated) {
        return roles.some((r) => keycloak.hasResourceRole(r));
      }
      return false;
    },
    [authenticated, keycloak]
  );

  const logout = useCallback(async () => {
    if (authenticated) {
      axiosInstance.defaults.headers.common["Authorization"] = "";
      setAuthenticated(false);
      await keycloak.logout({
        redirectUri: `${window.location.origin}`,
      });
    }
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }, [authenticated, keycloak]);

  const value = useMemo(
    () => ({
      keycloakInstance: keycloak,
      authenticated,
      initKeycloak,
      hasRole,
      logout,
    }),
    [authenticated, hasRole, initKeycloak, keycloak, logout]
  );

  return (
    <KeycloakContext.Provider value={value}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => {
  return useContext(KeycloakContext);
};
