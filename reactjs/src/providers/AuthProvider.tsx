import { useState, useEffect, createContext, ReactNode } from "react";
import { API_BASE } from "../lib/helpers";
import { User } from "../types/types";

interface AuthContextType {
  currentUser: User | null;
  checkIsLoggedIn: () => boolean;
  logout: () => void;

  register: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; message: string }>;
  login: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; message: string }>;
  authHeader: () => Promise<any>;
}

const defaultAuthContext: AuthContextType = {
  currentUser: null,
  checkIsLoggedIn: () => false,
  logout: () => {},
  register: async () => ({ ok: false, message: "" }),
  login: async () => ({ ok: false, message: "" }),
  authHeader: async () => {},
};

interface UserProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext(defaultAuthContext);

export const AuthProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const API_URL = `http://localhost:8000/api_v1/auth`;

  const register = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.token));
        setCurrentUser(data.token);
        return { ok: true, message: data.message };
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      console.error(error);
      const message = error.message
        ? error.message
        : "There was an error. Please try again later.";
      return { ok: false, message };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.token));
        setCurrentUser(data.token);
        return { ok: true, message: data.message };
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      const message = error.message
        ? error.message
        : "There was an error. Please try again later.";
      return { ok: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const getCurrentUser = async () => {
    if (currentUser) return currentUser;
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setCurrentUser(user);
      return user;
    }
    return null;
  };

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getCurrentUser();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const checkIsLoggedIn = () => {
    if (currentUser) return true;
    const userString = localStorage.getItem("user");
    return userString !== null;
  };

  const authHeader = async (): Promise<
    { authorization: string } | undefined
  > => {
    const user = await getCurrentUser();
    if (user) {
      return { authorization: user };
    } else {
      return undefined;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        checkIsLoggedIn,
        logout,
        register,
        login,
        authHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
