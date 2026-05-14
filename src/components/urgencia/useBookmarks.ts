import { useState, useCallback } from 'react';

const KEY = 'medeasy:bookmarks:urgencia';

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    return new Set(raw ? JSON.parse(raw) as string[] : []);
  } catch { return new Set(); }
}

function save(set: Set<string>) {
  try { localStorage.setItem(KEY, JSON.stringify([...set])); } catch { /* noop */ }
}

export function useBookmarks(): [Set<string>, (id: string) => void] {
  const [set, setSet] = useState(load);

  const toggle = useCallback((id: string) => {
    setSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      save(next);
      return next;
    });
  }, []);

  return [set, toggle];
}
