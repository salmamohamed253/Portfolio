import { Download, Menu, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { profile } from '../data/profile';
import { publicAsset } from '../lib/content';
import { href, type HomeSection, type Route } from '../lib/router';
import styles from './SiteHeader.module.css';

const NAV: { section: HomeSection; label: string }[] = [
  { section: 'work', label: 'Work' },
  { section: 'experience', label: 'Experience' },
  { section: 'about', label: 'About' },
  { section: 'skills', label: 'Skills' },
  { section: 'contact', label: 'Contact' },
];

function isActive(route: Route, section: HomeSection): boolean {
  if (section === 'work') return route.name === 'projects' || route.name === 'project' || (route.name === 'home' && route.section === 'work');
  return route.name === 'home' && route.section === section;
}

export function SiteHeader({ route }: { route: Route }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href={href.home()} className={styles.brand} aria-label={`${profile.name} — home`}>
          <span className={styles.mark} aria-hidden="true">
            S
          </span>
          <span className={styles.brandText}>{profile.shortName}</span>
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav
          id={menuId}
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="Primary"
          onClick={(event) => {
            // Close the mobile menu once a link inside it is chosen.
            if ((event.target as HTMLElement).closest('a')) setOpen(false);
          }}
        >
          <ul className={styles.links}>
            {NAV.map(({ section, label }) => (
              <li key={section}>
                <a
                  href={href.section(section)}
                  className={styles.link}
                  aria-current={isActive(route, section) ? 'true' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a className={styles.cv} href={publicAsset(profile.cvFile)} download>
            <Download size={15} aria-hidden="true" />
            CV <span className="visually-hidden">(PDF)</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
