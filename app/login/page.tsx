'use client';

import { GithubLoginButton } from "@/components/githubButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function LoginPage() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#0d1117',
    }}>
      <div style={{
        background: '#161b22', border: '1px solid #30363d', borderRadius: 12,
        padding: '48px 40px', textAlign: 'center', maxWidth: 400, width: '100%',
      }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>⚡</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#e6edf3' }}>
          Insighta Labs+
        </h1>
        <p style={{ color: '#8b949e', marginBottom: 32, fontSize: 14 }}>
          Profile Intelligence Platform
        </p>

      <GithubLoginButton/>

        <p style={{ marginTop: 24, fontSize: 12, color: '#484f58' }}>
          By signing in, you agree to use this platform responsibly.
        </p>
      </div>
    </div>
  );
}