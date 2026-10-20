import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react';
import type { ReactNode } from 'react';
import { Diagram } from '../components/Diagram';
import { EntryList, PendingNote } from '../components/Pending';
import { ProjectMeta } from '../components/ProjectMeta';
import { TagList } from '../components/TagList';
import { projects } from '../data/projects';
import { CATEGORY_LABELS, STATUS_LABELS, isPending, publishedProjects, visibleEntries } from '../lib/content';
import { href } from '../lib/router';
import type { Entry, Project } from '../types/content';
import { NotFoundPage } from './NotFoundPage';
import styles from './ProjectPage.module.css';

interface CaseSection {
  id: string;
  title: string;
  content: ReactNode;
}

function hasContent(entries: readonly Entry[] | undefined): boolean {
  return visibleEntries(entries).length > 0;
}

/** Builds the ordered case-study sections, skipping any without visible content. */
function buildSections(project: Project): CaseSection[] {
  const sections: (CaseSection | false)[] = [
    hasContent(project.problem) && {
      id: 'problem',
      title: 'The problem',
      content: <EntryList entries={project.problem} />,
    },
    (hasContent(project.solution) || hasContent(project.features)) && {
      id: 'solution',
      title: project.status === 'in-progress' ? 'The approach' : 'The solution',
      content: (
        <>
          <EntryList entries={project.solution} />
          <EntryList entries={project.features} variant="list" className={styles.features} />
        </>
      ),
    },
    hasContent(project.contribution) && {
      id: 'contribution',
      title: 'My contribution',
      content: <EntryList entries={project.contribution} variant="list" />,
    },
    hasContent(project.planned) && {
      id: 'planned',
      title: 'Planned scope',
      content: (
        <>
          <p className={styles.plannedNote}>Not yet implemented — listed here as the intended first version.</p>
          <EntryList entries={project.planned} variant="list" />
        </>
      ),
    },
    ((project.diagrams?.length ?? 0) > 0 || hasContent(project.architecture)) && {
      id: 'architecture',
      title: 'Architecture',
      content: (
        <>
          {project.diagrams?.map((diagram) => <Diagram key={diagram.title} diagram={diagram} />)}
          <EntryList entries={project.architecture} variant="list" />
        </>
      ),
    },
    hasContent(project.decisions) && {
      id: 'decisions',
      title: project.decisionsHeading ?? 'Engineering decisions',
      content: <EntryList entries={project.decisions} variant="titled" />,
    },
    hasContent(project.challenges) && {
      id: 'challenges',
      title: 'Challenges and lessons',
      content: <EntryList entries={project.challenges} variant="list" />,
    },
    hasContent(project.responsibleUse) && {
      id: 'responsible-use',
      title: 'Limitations and responsible use',
      content: <EntryList entries={project.responsibleUse} />,
    },
  ];
  return sections.filter((s): s is CaseSection => Boolean(s));
}

export function ProjectPage({ slug }: { slug: string }) {
  const published = publishedProjects(projects);
  const index = published.findIndex((p) => p.slug === slug);
  if (index === -1) return <NotFoundPage />;

  const project = published[index];
  const previous = published[index - 1];
  const next = published[index + 1];
  const sections = buildSections(project);
  const links = visibleEntries(project.links);

  return (
    <article className="container">
      <header className={styles.header}>
        <a href={href.projects()} className={styles.back}>
          <ArrowLeft size={16} aria-hidden="true" /> All projects
        </a>
        <ProjectMeta project={project} />
        <h1 tabIndex={-1} className={styles.title}>
          {project.title}
        </h1>
        <p className={styles.tagline}>{project.tagline}</p>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Project details">
          <dl className={styles.facts}>
            <div>
              <dt>Type</dt>
              <dd>{CATEGORY_LABELS[project.category]}</dd>
            </div>
            {project.status ? (
              <div>
                <dt>Status</dt>
                <dd>{STATUS_LABELS[project.status]}</dd>
              </div>
            ) : (
              <PendingNote>Project status</PendingNote>
            )}
            {project.context ? (
              <div>
                <dt>Context</dt>
                <dd>{project.context}</dd>
              </div>
            ) : null}
            {project.period ? (
              <div>
                <dt>Period</dt>
                <dd>{project.period}</dd>
              </div>
            ) : null}
            <div>
              <dt>Stack</dt>
              <dd>
                <TagList tags={project.stack} />
              </dd>
            </div>
          </dl>

          {links.length > 0 ? (
            <ul className={styles.links}>
              {links.map((link, i) =>
                isPending(link) ? (
                  <li key={i}>
                    <PendingNote>{link.body}</PendingNote>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </li>
                ),
              )}
            </ul>
          ) : null}

          {project.confidentiality ? (
            <p className={styles.confidential}>
              <Lock size={14} aria-hidden="true" />
              <span>{project.confidentiality}</span>
            </p>
          ) : null}

          {sections.length > 2 ? (
            <nav className={styles.toc} aria-label="On this page">
              <p className={styles.tocLabel}>On this page</p>
              <ol>
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => {
                        const target = document.getElementById(`section-${section.id}`);
                        target?.scrollIntoView({ block: 'start' });
                        target?.focus({ preventScroll: true });
                      }}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </aside>

        <div className={styles.content}>
          <p className={styles.summary}>{project.summary}</p>
          {sections.map((section, i) => (
            <section key={section.id} className={styles.section} aria-labelledby={`section-${section.id}`}>
              <h2 id={`section-${section.id}`} tabIndex={-1} className={styles.sectionTitle}>
                <span className={styles.sectionIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section.title}
              </h2>
              <div className={styles.sectionBody}>{section.content}</div>
            </section>
          ))}
        </div>
      </div>

      <nav className={styles.pager} aria-label="More projects">
        {previous ? (
          <a href={href.project(previous.slug)} className={styles.pagerLink}>
            <span className={styles.pagerLabel}>
              <ArrowLeft size={14} aria-hidden="true" /> Previous
            </span>
            <span>{previous.title}</span>
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a href={href.project(next.slug)} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className={styles.pagerLabel}>
              Next <ArrowRight size={14} aria-hidden="true" />
            </span>
            <span>{next.title}</span>
          </a>
        ) : null}
      </nav>
    </article>
  );
}
