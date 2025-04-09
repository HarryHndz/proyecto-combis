import { createContext, useContext, useState, useEffect } from "react";
import { LocalStoreUseCase } from "../useCases/localStoreUseCase";
import { IUser } from "../entities/IAuth";
import { LocalStoreRepository } from "@/data/repository/localRepository";

interface AuthContextType {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
  loading: boolean;
  redirectBasedOnAuth: () => string;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const localRepository = new LocalStoreUseCase<IUser>(new LocalStoreRepository());

  useEffect(() => {
    const storedUser = localRepository.get('user');
    console.log('En el AuthContext', storedUser);
    if (storedUser) {
      try {
        setUser(storedUser);

      } catch (error) {
        localRepository.remove('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (user: IUser) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localRepository.remove('user')
  };

  const redirectBasedOnAuth = (): string => {
    if (user) {
      return '/admin/';
    }
    return '/user/';
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, redirectBasedOnAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}