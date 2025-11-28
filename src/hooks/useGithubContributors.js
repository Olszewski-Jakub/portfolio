import { useEffect, useMemo, useRef, useState } from 'react';

// Simple in-memory cache to avoid duplicate fetches per session
const cache = new Map(); // key: "owner/repo" -> contributors array

function parseRepo(url) {
  if (!url || typeof url !== 'string') return null;
  try {
    const u = new URL(url);
    if (u.hostname !== 'github.com') return null;
    const parts = u.pathname.replace(/(^\/+)|(\/$)/g, '').split('/');
    // Expect at least [owner, repo]
    if (parts.length < 2) return null;
    let repo = parts[1];
    // Strip .git and possible extra path segments
    repo = repo.replace(/\.git$/, '');
    return `${parts[0]}/${repo}`;
  } catch (e) {
    return null;
  }
}

export default function useGithubContributors(githubUrl, options = {}) {
  const { limit = 12 } = options;
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const repo = useMemo(() => parseRepo(githubUrl), [githubUrl]);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!repo) {
      setContributors([]);
      setLoading(false);
      setError(null);
      return;
    }

    // If cached, use it immediately
    if (cache.has(repo)) {
      setContributors(cache.get(repo));
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);

    const url = `https://api.github.com/repos/${repo}/contributors?per_page=${Math.max(1, Math.min(100, limit))}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
      },
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          // Handle rate limit or not-found gracefully
          const text = await res.text().catch(() => '');
          throw new Error(`GitHub API error ${res.status}: ${text || res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data)
          ? data.map((c) => ({
              login: c.login,
              avatar_url: c.avatar_url,
              html_url: c.html_url,
              contributions: c.contributions,
              id: c.id,
            }))
          : [];
        cache.set(repo, list);
        setContributors(list);
        setLoading(false);
      })
      .catch((e) => {
        if (controller.signal.aborted) return;
        setError(e);
        setLoading(false);
      });

    return () => controller.abort();
  }, [repo, limit]);

  return { contributors, loading, error };
}

