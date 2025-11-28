import { useEffect, useState } from 'react';
import { getCollection } from '../services/content';

export default function useContent(collectionName, options) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const res = await getCollection(collectionName, options);
        if (!mounted) return;
        setData(res.data || []);
        setVersion((v) => v + 1);
        setLoading(false);
      } catch (e) {
        if (!mounted) return;
        setError(e);
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [collectionName, JSON.stringify(options || {})]);

  return { data, loading, error, version, refresh: () => getCollection(collectionName, options).then((r) => { setData(r.data); setVersion((v) => v + 1); }) };
}
