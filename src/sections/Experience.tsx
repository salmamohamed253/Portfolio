import { Section } from '../components/Section';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { publishedProjects } from '../lib/content';
import { href } from '../lib/router';
import styles from './Experience.module.css';

export function Experience() {
  const published = new Map(publishedProjects(projects).map((p) => [p.slug, p]));

  return (
    <Section id="experience" index="02" label="Experience" title="Professional experience">
      <ol className={styles.roles}>
        {experience.map((role) => {
          const related = (role.relatedProjects ?? []).flatMap((slug) => published.get(slug) ?? []);
          return (
            <li key={`${role.organisation}-${role.period}`} className={styles.role}>
              <div className={styles.aside}>
                <p className={styles.period}>{role.period}</p>
                <p className={styles.location}>{role.location}</p>
              </div>
              <div className={styles.main}>
                <h3 className={styles.title}>
                  {role.title}
                  <span className={styles.org}>{role.organisation}</span>
                </h3>
                {role.summary ? <p className={styles.summary}>{role.summary}</p> : null}
                <div className={styles.groups}>
                  {role.groups.map((group, i) => (
                    <div key={group.heading ?? i} className={styles.group}>
                      {group.heading ? <h4 className={styles.groupHeading}>{group.heading}</h4> : null}
                      <ul className={styles.points}>
                        {group.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {related.length > 0 ? (
                  <p className={styles.related}>
                    <span className={styles.relatedLabel}>Case studies</span>
                    {related.map((project, i) => (
                      <span key={project.slug}>
                        {i > 0 ? ', ' : ''}
                        <a href={href.project(project.slug)}>{project.title}</a>
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
