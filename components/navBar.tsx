'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profiles', label: 'Profiles' },
  { href: '/search', label: 'Search' },
  { href: '/account', label: 'Account' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav style={{
      background: '#161b22', borderBottom: '1px solid #30363d',
      padding: '0 24px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: 56,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ fontWeight: 700, fontSize: 16 }}>⚡ Insighta</span>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              color: pathname === l.href ? '#58a6ff' : '#8b949e',
              fontSize: 14, fontWeight: pathname === l.href ? 600 : 400,
              textDecoration: 'none',
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <a
        href={`${API_URL}/auth/logout`}
        onClick={async (e) => {
          e.preventDefault();
          await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
          window.location.href = '/login';
        }}
        style={{ color: '#8b949e', fontSize: 13, cursor: 'pointer' }}
      >
        Log out
      </a>
    </nav>
  );
}