import Fuse from 'fuse.js';
import type { Patologia } from '../content/schema';

export function createPatologiaSearch(list: Patologia[]) {
  return new Fuse(list, {
    keys: [
      { name: 'titulo', weight: 2 },
      { name: 'tags.texto', weight: 1.5 },
      { name: 'tabs.html', weight: 0.5 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
}
