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
          console.error(error);
          setUser(null);
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
        console.error(error);
        setUser(null);
        return null;
      }
    }
    return null;
  }, [isBrowser]);

  const logout = useCallback(async () => {
    const auth_token = retrieveToken();

    try {
      if (auth_token) {
        await authenticatedRequest(
          "/auth/token/logout/",
          "post",
          `Token ${auth_token}`
        );
        if (isBrowser) {
          sessionStorage.removeItem("auth_token");
        }
        setUser(null);
        router.replace("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [router, isBrowser, retrieveToken]);

  const isUserProfileComplete = (): boolean => {
    if (!user) return false;
    if (
      !user.full_name ||
      !user.contact_email ||
      !user.contact_phone ||
      false
    ) {
      return false;
    }

    return true;
  };

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
  }, [router]);

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
          setUser(null);
        }
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

        if (user && isUserProfileComplited) {
          router.replace("/home");
        }
        if (!isUserProfileComplited) {
          router.replace("/profile/edit");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [getToken, router, user]
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
  const isUserProfileComplited = isUserProfileComplete();

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
        isUserProfileComplited,
      }}
    >
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
