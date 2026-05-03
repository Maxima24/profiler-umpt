// 'use client';

// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { apiGet } from '../api/client';

// interface AuthUser {
//   id: string;
//   username: string;
//   email: string | null;
//   avatar_url: string | null;
//   role: 'admin' | 'analyst';
//   last_login_at: string | null;
// }

// interface AuthContextValue {
//   user: AuthUser | null;
//   loading: boolean;
//   isAdmin: boolean;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextValue>({
//   user: null,
//   loading: true,
//   isAdmin: false,
//   logout: async () => {},
// });

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<AuthUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const isPublicPath =
//       window.location.pathname === '/login' ||
//       window.location.pathname.startsWith('/auth/');

//     apiGet('/auth/me')
//       .then((res) => {
//         if (res?.data) {
//           setUser(res.data);
//         } else if (!isPublicPath) {
//           window.location.href = '/login';
//         }
//       })
//       .catch(() => {
//         if (!isPublicPath) {
//           window.location.href = '/login';
//         }
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const logout = async () => {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
//     await fetch(`${apiUrl}/auth/logout`, {
//       method: 'POST',
//       credentials: 'include',
//     }).catch(() => {});
//     window.location.href = '/login';
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, loading, isAdmin: user?.role === 'admin', logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);