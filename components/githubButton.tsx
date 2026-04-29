import { useState } from 'react';

export function GithubLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
const API_URL =process.env.NEXT_PUBLIC_API_URL!
  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      // Step 1: Get the GitHub OAuth URL from your backend (or define it directly)
      const response = await fetch(`${API_URL}/auth/github/web`, {
        method: 'GET',
      });
      const { githubAuthUrl } = await response.json();
      
      // Step 2: Redirect to GitHub
      window.location.href = githubAuthUrl;
    } catch (error) {
      console.error('Failed to initiate login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGithubLogin}
      disabled={isLoading}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        background: '#21262d', border: '1px solid #30363d', borderRadius: 8,
        color: '#e6edf3', padding: '12px 20px', fontSize: 15, fontWeight: 500,
        cursor: isLoading ? 'not-allowed' : 'pointer',
        textDecoration: 'none', transition: 'background 0.2s',
      }}
    >
      {isLoading ? 'Redirecting...' : 'Sign in with GitHub'}
    </button>
  );
}