import type { Entry, PendingEntry, Project, ProjectCategory, ProjectStatus } from '../types/content';

/**
 * Placeholders are visible while developing (`npm run dev`) and stripped from
 * production builds (`npm run build`).
 */
export const SHOW_PENDING: boolean = import.meta.env.DEV;

/** Marks content that the author still needs to confirm or supply. */
export function pending(body: string, title?: string): PendingEntry {
  return { pending: true, body, title };
}

export function isPending(entry: unknown): entry is PendingEntry {
  return typeof entry === 'object' && entry !== null && (entry as { pending?: unknown }).pending === true;
}

export function entryBody(entry: Entry): string {
  return typeof entry === 'string' ? entry : entry.body;
}

export function entryTitle(entry: Entry): string | undefined {
  return typeof entry === 'string' ? undefined : entry.title;
}

/** Drops pending entries unless placeholders are being shown. */
export function visibleEntries<T>(
  entries: readonly T[] | undefined,
  showPending: boolean = SHOW_PENDING,
): T[] {
  if (!entries) return [];
  return showPending ? [...entries] : entries.filter((entry) => !isPending(entry));
}

/** Projects that should appear on the site in the current build. */
export function publishedProjects(
  projects: readonly Project[],
  showPending: boolean = SHOW_PENDING,
): Project[] {
  return projects.filter((project) => showPending || !project.draft);
}

export function featuredProjects(projects: readonly Project[]): Project[] {
  return projects
    .filter((project): project is Project & { featured: number } => project.featured !== undefined)
    .sort((a, b) => a.featured - b.featured);
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  professional: 'Professional',
  academic: 'Academic',
  independent: 'Independent',
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  prototype: 'Prototype',
};

/** Resolves a file in `public/` against the deployed base path. */
export function publicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
