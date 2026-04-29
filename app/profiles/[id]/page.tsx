'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Nav from '../../../components/navBar';
import { apiGet } from '../../../api/client';

export default function ProfileDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet(`/api/profiles/${id}`)
      .then((res) => setProfile(res?.data))
      .catch(() => router.push('/profile'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <><Nav /><main style={{ padding: 32, color: '#8b949e' }}>Loading...</main></>;

  const row = (label: string, value: any) => (
    <tr style={{ borderBottom: '1px solid #21262d' }}>
      <td style={{ padding: '12px 16px', color: '#8b949e', width: 200 }}>{label}</td>
      <td style={{ padding: '12px 16px' }}>{value ?? '—'}</td>
    </tr>
  );

  return (
    <>
      <Nav />
      <main style={{ padding: '32px', maxWidth: 700, margin: '0 auto' }}>
        <button
          onClick={() => router.back()}
          style={{ background: 'none', border: 'none', color: '#58a6ff', cursor: 'pointer', marginBottom: 20, fontSize: 14 }}
        >
          ← Back
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>{profile?.name}</h1>
        <table style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', borderRadius: 10, borderCollapse: 'collapse', fontSize: 14 }}>
          <tbody>
            {row('ID', <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{profile?.id}</span>)}
            {row('Gender', profile?.gender)}
            {row('Gender Probability', profile?.gender_probability)}
            {row('Age', profile?.age)}
            {row('Age Group', profile?.age_group)}
            {row('Country', profile?.country_name || profile?.country_id)}
            {row('Country Probability', profile?.country_probability)}
            {row('Created', profile?.created_at ? new Date(profile.created_at).toLocaleString() : '—')}
          </tbody>
        </table>
      </main>
    </>
  );
}