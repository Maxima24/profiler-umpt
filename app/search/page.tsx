'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '../../components/navBar';
import { apiGet } from '../../api/client';

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await apiGet('/api/profiles/search', { q: query });
      if (res?.status === 'error') setError(res.message);
      else setResults(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <main style={{ padding: '40px 32px', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Natural Language Search</h1>
        <p style={{ color: '#8b949e', fontSize: 14, marginBottom: 24 }}>
          Try: "young males from nigeria", "adult females above 30", "seniors from kenya"
        </p>

        <div style={{ display: 'flex', gap: 10 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
            placeholder="Describe the profiles you're looking for..."
            style={{
              flex: 1, background: '#21262d', border: '1px solid #30363d',
              color: '#e6edf3', borderRadius: 8, padding: '12px 16px', fontSize: 14,
              outline: 'none',
            }}
          />
          <button
            onClick={search}
            disabled={loading}
            style={{
              background: '#1f6feb', color: '#fff', border: 'none',
              borderRadius: 8, padding: '12px 24px', fontSize: 14,
              fontWeight: 600, cursor: 'pointer',
            }}
          >
            {loading ? '...' : 'Search'}
          </button>
        </div>

        {error && <p style={{ color: '#f85149', marginTop: 16, fontSize: 14 }}>{error}</p>}

        {results && (
          <div style={{ marginTop: 32 }}>
            <p style={{ color: '#8b949e', fontSize: 13, marginBottom: 16 }}>
              {results.total} results found
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#161b22', color: '#8b949e' }}>
                  {['Name', 'Gender', 'Age', 'Country', ''].map((h) => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #30363d' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.data?.map((p: any) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #21262d', cursor: 'pointer' }} onClick={() => router.push(`/profiles/${p.id}`)}>
                    <td style={{ padding: '10px 14px' }}>{p.name}</td>
                    <td style={{ padding: '10px 14px' }}>{p.gender || '—'}</td>
                    <td style={{ padding: '10px 14px' }}>{p.age ?? '—'}</td>
                    <td style={{ padding: '10px 14px' }}>{p.country_id || '—'}</td>
                    <td style={{ padding: '10px 14px' }}><span style={{ color: '#58a6ff', fontSize: 12 }}>View →</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}