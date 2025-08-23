// composables/useMyFetch.ts
import { useCookie, useRuntimeConfig, useFetch } from "#app";

export function useMyFetch<T>(url: string, options: any = {}) {
  const config = useRuntimeConfig();
  const token = useCookie<string | null>("token", { default: () => null });

  // Attach token if exists
  const headers: Record<string, string> = {
    ...(options.headers || {}),
  };
  if (token.value) {
    headers.Authorization = `Bearer ${token.value}`;
  }

  return useFetch<T>(url, {
    baseURL: config.public.apiBaseUrl,
    ...options,
    headers,
  });
}

// Helpers to manage token
export function useAuthToken() {
  const token = useCookie<string | null>("token", { default: () => null });

  function setToken(newToken: string) {
    token.value = newToken;
  }

  function clearToken() {
    token.value = null;
  }

  return { token, setToken, clearToken };
}
