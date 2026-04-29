'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Nav from '../../components/navBar';
import { apiGet } from '../../api/client';

export default function ProfilesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const page = searchParams.get('page') || '1';
  const gender = searchParams.get('gender') || '';
  const country = searchParams.get('country_id') || '';

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params: Record<string, string> = { page, limit: '20' };
        if (gender) params.gender = gender;
        if (country) params.country_id = country;
        const res = await apiGet('/api/profiles', params);
        setData(res);
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page, gender, country]);

  const navigate = (p: Record<string, string>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(p).forEach(([k, v]) => v ? next.set(k, v) : next.delete(k));
    router.push(`/profiles?${next.toString()}`);
  };

  return (
    <>
      <Nav />
      <main style={{ padding: '32px', maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Profiles</h1>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          <select
            value={gender}
            onChange={(e) => navigate({ gender: e.target.value, page: '1' })}
            style={selectStyle}
          >
            <option value="">All genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            placeholder="Country code (e.g. NG)"
            value={country}
            onChange={(e) => navigate({ country_id: e.target.value.toUpperCase(), page: '1' })}
            style={inputStyle}
            maxLength={2}
          />

          <button
            onClick={() => router.push('/profiles')}
            style={btnStyle}
          >
            Clear filters
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <p style={{ color: '#8b949e' }}>Loading...</p>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#161b22', color: '#8b949e' }}>
                  {['Name', 'Gender', 'Age', 'Age Group', 'Country', ''].map((h) => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #30363d' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((p: any) => (
                  <tr
                    key={p.id}
                    style={{ borderBottom: '1px solid #21262d', cursor: 'pointer' }}
                    onClick={() => router.push(`/profiles/${p.id}`)}
                  >
                    <td style={tdStyle}>{p.name}</td>
                    <td style={tdStyle}>{p.gender || '—'}</td>
                    <td style={tdStyle}>{p.age ?? '—'}</td>
                    <td style={tdStyle}>{p.age_group || '—'}</td>
                    <td style={tdStyle}>{p.country_id || '—'}</td>
                    <td style={tdStyle}>
                      <span style={{ color: '#58a6ff', fontSize: 12 }}>View →</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div style={{ display: 'flex', gap: 12, marginTop: 20, alignItems: 'center' }}>
              <button
                disabled={!data?.links?.prev}
                onClick={() => navigate({ page: String(parseInt(page) - 1) })}
                style={{ ...btnStyle, opacity: data?.links?.prev ? 1 : 0.4 }}
              >
                ← Prev
              </button>
              <span style={{ fontSize: 13, color: '#8b949e' }}>
                Page {data?.page} of {data?.total_pages} · {data?.total} total
              </span>
              <button
                disabled={!data?.links?.next}
                onClick={() => navigate({ page: String(parseInt(page) + 1) })}
                style={{ ...btnStyle, opacity: data?.links?.next ? 1 : 0.4 }}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

const selectStyle: React.CSSProperties = {
  background: '#21262d', border: '1px solid #30363d', color: '#e6edf3',
  borderRadius: 6, padding: '8px 12px', fontSize: 13,
};
const inputStyle: React.CSSProperties = {
  ...selectStyle, outline: 'none',
};
const btnStyle: React.CSSProperties = {
  background: '#21262d', border: '1px solid #30363d', color: '#e6edf3',
  borderRadius: 6, padding: '8px 14px', fontSize: 13, cursor: 'pointer',
};
const tdStyle: React.CSSProperties = { padding: '10px 14px' };