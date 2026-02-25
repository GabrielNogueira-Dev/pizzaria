import { api } from "@/services/api";
import { LoginResponse, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: User | null;
  signed: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);

      const response = await api.post<LoginResponse>("/session", {
        email: email,
        password: password,
      });

      const { token, ...userData } = response.data;

      await AsyncStorage.setItem("@token:pizzaria", token);
      await AsyncStorage.setItem("@user:pizzaria", JSON.stringify(userData));
      console.log(userData);
      setUser(userData);
      setSigned(true);
    } catch (error: any) {
      // Se a API retornar erro, lançamos para o Login capturar
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }

      throw new Error("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext
      value={{
        signed,
        loading,
        signIn,
        user,
      }}
    >
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Contexto não encontrado");
  }

  return context;
}
