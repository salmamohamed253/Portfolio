import { useEffect, useState } from 'react';

/**
 * Minimal hash router. Hash URLs (`#/projects/slug`) work on GitHub Pages
 * without server rewrites, so deep links and refreshes never 404.
 */

export const HOME_SECTIONS = ['work', 'experience', 'about', 'skills', 'education', 'contact'] as const;
export type HomeSection = (typeof HOME_SECTIONS)[number];

export type Route =
  | { name: 'home'; section?: HomeSection }
  | { name: 'projects' }
  | { name: 'project'; slug: string }
  | { name: 'not-found'; path: string };

/**
 * Converts a location hash into a route. Returns `null` for in-page anchors
 * such as `#main` that are not routes, so the current route is kept.
 */
export function parseHash(hash: string): Route | null {
  if (hash === '' || hash === '#' || hash === '#/') return { name: 'home' };
  if (!hash.startsWith('#/')) return null;

  const path = decodeURIComponent(hash.slice(2)).replace(/\/+$/, '');
  const segments = path.split('/').filter(Boolean);

  if (segments.length === 1 && (HOME_SECTIONS as readonly string[]).includes(segments[0])) {
    return { name: 'home', section: segments[0] as HomeSection };
  }
  if (segments.length === 1 && segments[0] === 'projects') return { name: 'projects' };
  if (segments.length === 2 && segments[0] === 'projects') return { name: 'project', slug: segments[1] };

  return { name: 'not-found', path };
}

export const href = {
  home: () => '#/',
  section: (section: HomeSection) => `#/${section}`,
  projects: () => '#/projects',
  project: (slug: string) => `#/projects/${encodeURIComponent(slug)}`,
};

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash) ?? { name: 'home' });

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash(window.location.hash);
      if (next) setRoute(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}
