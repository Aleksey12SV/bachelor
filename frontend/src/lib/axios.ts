import axios from "axios";
import type Keycloak from "keycloak-js";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

export function interceptRequestAuthToken(keycloak: Keycloak) {
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (localStorage.getItem("token") === null || localStorage.getItem("token") === '') return config;
      await keycloak.updateToken();
      config.headers.Authorization = `Bearer ${keycloak.token}`;

      return config;
    },
    (error) => Promise.reject(error)
  );
}
