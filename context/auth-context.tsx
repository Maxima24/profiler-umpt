'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiGet } from '../api/client';

interface AuthUser {
  id: string;
  username: string;
  email: string | null;
  avatar_url: string | null;
  role: 'admin' | 'analyst';
  last_login_at: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isAdmin: false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet('/auth/me')
      .then((res) => setUser(res?.data ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    await fetch(`${apiUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {});
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAdmin: user?.role === 'admin', logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);