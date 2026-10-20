import { profile } from '../data/profile';
import { href } from '../lib/router';
import styles from './SiteFooter.module.css';

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {YEAR} {profile.name}
        </p>
        <p className={styles.meta}>
          Built with React, TypeScript and Vite.{' '}
          <a href="https://github.com/salmamohamed253/Portfolio" target="_blank" rel="noopener noreferrer">
            View source
          </a>
          {' · '}
          <a href={href.home()}>Back to top</a>
        </p>
      </div>
    </footer>
  );
}
