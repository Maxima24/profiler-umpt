'use client';
import { useEffect, useState } from 'react';
import Nav from '../../components/navBar';
import { apiGet } from '../../api/client';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const [profilesRes, meRes] = await Promise.all([
          apiGet('/api/profiles', { limit: '1', page: '1' }),
          apiGet('/auth/me'),
        ]);
        setStats({ total: profilesRes?.total });
        setUser(meRes?.data);
      } catch {
        window.location.href = '/login';
      }
    }
    load();
  }, []);

  const card = (label: string, value: any) => (
    <div style={{
      background: '#161b22', border: '1px solid #30363d', borderRadius: 10,
      padding: '24px 28px', minWidth: 180,
    }}>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value ?? '—'}</div>
      <div style={{ color: '#8b949e', fontSize: 13, marginTop: 4 }}>{label}</div>
    </div>
  );

  return (
    <>
      <Nav />
      <main style={{ padding: '40px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>
            Welcome{user ? `, @${user.username}` : ''}
          </h1>
          <p style={{ color: '#8b949e', fontSize: 14, marginTop: 4 }}>
            Role: <span style={{ color: '#f0883e' }}>{user?.role}</span>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {card('Total Profiles', stats?.total)}
        </div>

        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Quick links</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="/profiles" style={{
              background: '#1f6feb', color: '#fff', padding: '10px 20px',
              borderRadius: 8, fontSize: 14, fontWeight: 500,
            }}>Browse Profiles</a>
            <a href="/search" style={{
              background: '#21262d', color: '#e6edf3', padding: '10px 20px',
              borderRadius: 8, border: '1px solid #30363d', fontSize: 14,
            }}>Natural Language Search</a>
          </div>
        </div>
      </main>
    </>
  );
}