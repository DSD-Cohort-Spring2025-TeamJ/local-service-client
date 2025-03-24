import { useAuth } from "../context/AuthContext";
import { useCallback } from "react";

export function useFetchWithAuth() {
  const { token } = useAuth();

  const fetchWithAuth = useCallback(
    (url, options = {}) => {
      const headers = {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      };

      return fetch(url, { ...options, headers });
    },
    [token]
  );

  return { fetchWithAuth };
}
