import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

// Minimal data access without any localStorage or version caching
async function fetchCollection(name, { includeUnpublished = false } = {}) {
  const col = collection(db, name);
  try {
    const q = query(col, orderBy('order'));
    const snap = await getDocs(q);
    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return includeUnpublished ? rows : rows.filter((d) => d.published !== false);
  } catch (e) {
    // Fallback if index missing
    const snap = await getDocs(col);
    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return includeUnpublished ? rows : rows.filter((d) => d.published !== false);
  }
}

export async function getCollection(name, opts) {
  const data = await fetchCollection(name, opts);
  return { data };
}
