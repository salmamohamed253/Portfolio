import type { ReactNode } from 'react';
import { SHOW_PENDING, entryBody, entryTitle, isPending, visibleEntries } from '../lib/content';
import type { Entry } from '../types/content';
import styles from './Pending.module.css';

/** A placeholder for content the author still has to confirm. Development only. */
export function PendingNote({ children, inline = false }: { children: ReactNode; inline?: boolean }) {
  if (!SHOW_PENDING) return null;
  const Tag = inline ? 'span' : 'div';
  return (
    <Tag className={inline ? styles.inline : styles.block}>
      <span className={styles.label}>To confirm</span> {children}
    </Tag>
  );
}

/** Banner reminding the author that placeholders are visible in this build. */
export function PendingBanner() {
  if (!SHOW_PENDING) return null;
  return (
    <div className={styles.banner} role="note">
      Development preview — items marked <span className={styles.label}>To confirm</span> are placeholders and are
      removed from production builds. Edit them in <code>src/data/</code>.
    </div>
  );
}

interface EntryListProps {
  entries: readonly Entry[] | undefined;
  /** `prose` renders paragraphs; `list` renders bullets; `titled` renders headed blocks. */
  variant?: 'prose' | 'list' | 'titled';
  className?: string;
}

/** Renders a list of entries, hiding or marking pending ones. */
export function EntryList({ entries, variant = 'prose', className }: EntryListProps) {
  const items = visibleEntries(entries);
  if (items.length === 0) return null;

  if (variant === 'list') {
    return (
      <ul className={`${styles.list} ${className ?? ''}`}>
        {items.map((entry, i) =>
          isPending(entry) ? (
            <li key={i} className={styles.pendingItem}>
              <PendingNote inline>{entryBody(entry)}</PendingNote>
            </li>
          ) : (
            <li key={i}>{entryBody(entry)}</li>
          ),
        )}
      </ul>
    );
  }

  if (variant === 'titled') {
    return (
      <div className={`${styles.titled} ${className ?? ''}`}>
        {items.map((entry, i) => {
          const title = entryTitle(entry);
          if (isPending(entry)) {
            return (
              <PendingNote key={i}>
                {title ? <strong>{title}: </strong> : null}
                {entry.body}
              </PendingNote>
            );
          }
          return (
            <div key={i} className={styles.titledItem}>
              {title ? <h4 className={styles.titledHeading}>{title}</h4> : null}
              <p>{entryBody(entry)}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`${styles.prose} ${className ?? ''}`}>
      {items.map((entry, i) =>
        isPending(entry) ? <PendingNote key={i}>{entry.body}</PendingNote> : <p key={i}>{entryBody(entry)}</p>,
      )}
    </div>
  );
}
