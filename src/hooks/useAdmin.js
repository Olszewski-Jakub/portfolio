import { useEffect, useState } from 'react';

// For now: gate admin purely via an email allowlist from .env
// REACT_APP_ADMIN_EMAILS=you@domain.com,other@domain.com
export default function useAdmin(user) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allow = (process.env.REACT_APP_ADMIN_EMAILS || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    const email = (user.email || '').toLowerCase();
    setIsAdmin(allow.includes(email));
    setLoading(false);
  }, [user]);

  return { isAdmin, loading };
}
