import { createContext, ReactNode, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";

import { api } from "../services/api";

interface Associate {
  email: string;
  roles: Array<"student" | "instructor" | "pilot">;
}

interface SignInCredentials {
  email: string;
  password: string;
  keepConnected: boolean;
}

interface AuthContextData {
  associate: Associate;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

interface LoginResponse {
  token: string;
  roles: Array<"student" | "instructor" | "pilot">;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [associate, setAssociate] = useState({} as Associate);

  const navigate = useNavigate();

  const isAuthenticated = !!associate;

  async function signIn({ email, password, keepConnected }: SignInCredentials) {
    try {
      const response = await api.post<LoginResponse>("/login", {
        email,
        password,
        keepConnected,
      });

      const { token, roles } = response.data;

      console.log(token, roles);

      cookies.set("skynet.token", token, {
        expire: 1 / 3, // 8 horas
        domain: "/",
      });

      if (!roles) {
        return setAssociate({ email, roles: [] });
      }
      setAssociate({ email, roles });
    } catch (err) {
      console.log(err);
    }
  }

  async function signOut() {
    cookies.remove("skynet.token");
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{ associate, signIn, signOut, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
