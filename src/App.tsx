import { useEffect, useRef } from 'react';
import { PendingBanner } from './components/Pending';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { profile } from './data/profile';
import { projects } from './data/projects';
import { publishedProjects } from './lib/content';
import { useHashRoute, type Route } from './lib/router';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectPage } from './pages/ProjectPage';
import { ProjectsPage } from './pages/ProjectsPage';

const BASE_TITLE = `${profile.name} — Software & Applied AI Engineer`;

function documentTitle(route: Route): string {
  switch (route.name) {
    case 'projects':
      return `Projects — ${profile.name}`;
    case 'project': {
      const project = publishedProjects(projects).find((p) => p.slug === route.slug);
      return project ? `${project.title} — ${profile.name}` : `Not found — ${profile.name}`;
    }
    case 'not-found':
      return `Not found — ${profile.name}`;
    default:
      return BASE_TITLE;
  }
}

/** A stable key so the page only re-mounts when the page itself changes, not when scrolling to a home section. */
function pageKey(route: Route): string {
  return route.name === 'project' ? `project:${route.slug}` : route.name;
}

function Page({ route }: { route: Route }) {
  switch (route.name) {
    case 'home':
      return <HomePage />;
    case 'projects':
      return <ProjectsPage />;
    case 'project':
      return <ProjectPage slug={route.slug} />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  const route = useHashRoute();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    document.title = documentTitle(route);

    // Wait for the new page to render before moving scroll and focus.
    const frame = requestAnimationFrame(() => {
      const firstRender = isFirstRender.current;
      isFirstRender.current = false;

      if (route.name === 'home' && route.section) {
        const heading = document.getElementById(`${route.section}-heading`);
        document.getElementById(route.section)?.scrollIntoView({ block: 'start' });
        heading?.focus({ preventScroll: true });
        return;
      }

      // On first load, keep the browser's default position and focus.
      if (firstRender) return;
      window.scrollTo({ top: 0 });
      mainRef.current?.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);

  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to content
      </a>
      <PendingBanner />
      <SiteHeader route={route} />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <div key={pageKey(route)} className="page-enter">
          <Page route={route} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
