"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { AuthContextType } from "../types/auth";
import { api, authenticatedRequest } from "../utils/api";
import { User } from "../types/user";
import { AxiosResponse } from "axios";
import Loading from "../components/ui/custom/loading";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<
  Omit<AuthContextType, "auth_token"> | undefined
>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const isBrowser = typeof window !== "undefined";

  const storeToken = useCallback(
    (token: string) => {
      if (isBrowser) {
        try {
          sessionStorage.setItem("auth_token", token);
        } catch (error) {
          console.error("Error storing token in sessionStorage:", error);
        }
      }
    },
    [isBrowser]
  );

  const retrieveToken = useCallback(() => {
    if (isBrowser) {
      try {
        return sessionStorage.getItem("auth_token");
      } catch (error) {
        console.error("Error retrieving token from sessionStorage:", error);
        return null;
      }
    }
    return null;
  }, [isBrowser]);

  const logout = useCallback(async () => {
    const auth_token = retrieveToken();

    try {
      if (auth_token) {
        await api.post("/auth/token/logout/", `Token ${auth_token}`, {
          headers: { Authorization: `Token ${auth_token}` },
        });
        if (isBrowser) {
          sessionStorage.removeItem("auth_token");
        }
        setUser(null);
        router.replace("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [router, isBrowser]);

  const getUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<User> = await authenticatedRequest<User>(
        "/profile/me/",
        "get"
      );
      setUser(response.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setToken = useCallback(
    (token: string) => {
      storeToken(token);
    },
    [storeToken]
  );

  const getToken = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await api.post<{ auth_token: string }>(
          "/auth/token/login/",
          {
            email,
            password,
          }
        );
        if (response.data && response.data.auth_token) {
          setToken(response.data.auth_token);
          await getUserData();
        } else {
          console.error("Token not found in response");
          logout();
        }
      } catch (error: any) {
        console.error("Error fetching token:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    },
    [getUserData, logout, setToken]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        await getToken(email, password);
        router.replace("/home");
      } finally {
        setIsLoading(false);
      }
    },
    [getToken, router]
  );

  const register = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        await getToken(email, password);
        router.replace("/profile/edit");
      } finally {
        setIsLoading(false);
      }
    },
    [getToken, router]
  );

  const isAuthenticated = !!retrieveToken();

  useEffect(() => {
    const storedToken = retrieveToken();
    if (storedToken) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, [retrieveToken, getUserData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        isAuthenticated,
      }}
    >
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
