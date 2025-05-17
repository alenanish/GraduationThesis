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
  const [auth_token, setAuthToken] = useState<string | null>(null); 
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const storeToken = useCallback((token: string) => {
    try {
      sessionStorage.setItem("auth_token", token);
    } catch (error) {
      console.error("Error storing token in sessionStorage:", error);
    }
  }, []);

  const retrieveToken = useCallback(() => {
    try {
      return sessionStorage.getItem("auth_token");
    } catch (error) {
      console.error("Error retrieving token from sessionStorage:", error);
      return null;
    }
  }, []);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem("auth_token");
    } catch (error) {
      console.error("Error removing token from sessionStorage:", error);
    }
    setAuthToken(null);
    setUser(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const storedToken = retrieveToken();
    if (storedToken) {
      setAuthToken(storedToken);
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, [retrieveToken]);

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
      setAuthToken(token);
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
            password: password,
            email: email,
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
        router.push("/home");
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
        router.push("/profile/me");
      } finally {
        setIsLoading(false);
      }
    },
    [getToken, router]
  );

  const isAuthenticated = !!auth_token;

  const value = {
    user,
    login,
    logout,
    isLoading,
    register,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
