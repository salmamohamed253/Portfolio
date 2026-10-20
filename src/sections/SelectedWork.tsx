import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { ProjectCard } from '../components/ProjectCard';
import { Section } from '../components/Section';
import { projects } from '../data/projects';
import { featuredProjects, publishedProjects } from '../lib/content';
import { href } from '../lib/router';
import styles from './SelectedWork.module.css';

export function SelectedWork() {
  const published = publishedProjects(projects);
  const featured = featuredProjects(published);
  const remaining = published.length - featured.length;

  return (
    <Section
      id="work"
      index="01"
      label="Selected work"
      title="Featured projects"
      intro="A selection of professional, academic and independent projects. Employer projects are documented as architecture case studies; confidential code, data and credentials are not published."
    >
      <div className={styles.list}>
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} variant="feature" index={i + 1} />
        ))}
      </div>
      <div className={styles.more}>
        <ButtonLink href={href.projects()} icon={<ArrowRight aria-hidden="true" />}>
          All projects{remaining > 0 ? ` (${remaining} more)` : ''}
        </ButtonLink>
      </div>
    </Section>
  );
}
