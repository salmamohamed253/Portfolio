import { ArrowLeft } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { href } from '../lib/router';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={`container ${styles.page}`}>
      <p className={styles.code}>404</p>
      <h1 tabIndex={-1} className={styles.title}>
        This page doesn’t exist
      </h1>
      <p className={styles.text}>The link may be out of date, or the project may have been renamed.</p>
      <div className={styles.actions}>
        <ButtonLink variant="primary" href={href.home()} icon={<ArrowLeft aria-hidden="true" />}>
          Back to home
        </ButtonLink>
        <ButtonLink href={href.projects()}>Browse projects</ButtonLink>
      </div>
    </div>
  );
}
