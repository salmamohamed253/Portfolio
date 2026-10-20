import { entryBody, isPending, visibleEntries } from '../lib/content';
import type { Entry } from '../types/content';
import styles from './TagList.module.css';

interface TagListProps {
  tags: readonly Entry[];
  /** Maximum number of confirmed tags to show; the rest are summarised as "+N". */
  limit?: number;
  label?: string;
}

export function TagList({ tags, limit, label = 'Technologies' }: TagListProps) {
  const visible = visibleEntries(tags);
  const confirmed = visible.filter((tag) => !isPending(tag));
  const pendingTags = limit === undefined ? visible.filter(isPending) : [];
  const shown = limit === undefined ? confirmed : confirmed.slice(0, limit);
  const hidden = confirmed.length - shown.length;

  if (shown.length === 0 && pendingTags.length === 0) return null;

  return (
    <ul className={styles.tags} aria-label={label}>
      {shown.map((tag) => (
        <li key={entryBody(tag)} className={styles.tag}>
          {entryBody(tag)}
        </li>
      ))}
      {hidden > 0 ? (
        <li className={`${styles.tag} ${styles.more}`}>
          +{hidden}
          <span className="visually-hidden"> more</span>
        </li>
      ) : null}
      {pendingTags.map((tag) => (
        <li key={entryBody(tag)} className={`${styles.tag} ${styles.pending}`} title="To confirm — hidden in production">
          ? {entryBody(tag)}
        </li>
      ))}
    </ul>
  );
}
