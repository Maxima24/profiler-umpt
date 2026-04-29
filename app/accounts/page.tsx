'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '../../components/navBar';
import { apiGet } from '../../api/client';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    apiGet('/auth/me')
      .then((res) => setUser(res?.data))
      .catch(() => router.push('/login'));
  }, []);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  return (
    <>
      <Nav />
      <main style={{ padding: '40px 32px', maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Account</h1>

        {user ? (
          <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: '28px 32px' }}>
            {user.avatar_url && (
              <img
                src={user.avatar_url}
                alt={user.username}
                style={{ width: 72, height: 72, borderRadius: '50%', marginBottom: 16 }}
              />
            )}
            <div style={{ fontSize: 20, fontWeight: 700 }}>@{user.username}</div>
            <div style={{ color: '#8b949e', fontSize: 14, marginTop: 4 }}>{user.email || 'No email'}</div>

            <div style={{ marginTop: 20, display: 'inline-block', background: '#0d419d', color: '#58a6ff', borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 600 }}>
              {user.role}
            </div>

            <div style={{ marginTop: 24, fontSize: 13, color: '#8b949e' }}>
              Last login: {user.last_login_at ? new Date(user.last_login_at).toLocaleString() : '—'}
            </div>

            <button
              onClick={async () => {
                await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
                router.push('/login');
              }}
              style={{
                marginTop: 28, background: '#da3633', color: '#fff', border: 'none',
                borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 14,
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          <p style={{ color: '#8b949e' }}>Loading...</p>
        )}
      </main>
    </>
  );
}