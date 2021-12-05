import { createContext, ReactNode, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../services/api";

interface Associate {
  email: string;
  type: "student" | "instructor" | "pilot";
  name: string;
  license: null | string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  associate: Associate;
  signIn: (credentials: SignInCredentials) => Promise<[boolean, string]>;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

interface LoginResponse {
  token: string;
  id: number;
  name: string;
  type: "student" | "instructor" | "pilot";
  license: null | string;
  email: string;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [associate, setAssociate] = useState({} as Associate);

  const navigate = useNavigate();

  const isAuthenticated = !(
    Object.keys(associate).length === 0 && associate.constructor === Object
  );

  async function signIn({
    email,
    password,
  }: SignInCredentials): Promise<[boolean, string]> {
    try {
      const response = await api.post<LoginResponse>("/users/login", {
        email,
        password,
      });

      const { type, name, license, email: associateEmail } = response.data;

      // cookies.set("skynet.token", token, {
      //   expire: 1 / 3, // 8 horas
      //   domain: "/",
      // });

      setAssociate({ email: associateEmail, type, name, license });

      navigate("/perfil");

      return [false, ""];
    } catch (err) {
      return [true, String(err)];
    }
  }

  async function signOut() {
    setAssociate({} as Associate);

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
