import { Section } from '../components/Section';
import { skillGroups } from '../data/skills';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      label="Skills"
      title="Technical skills"
      intro="Grouped by area rather than ranked. Each group notes where the skills have been applied."
    >
      <div className={styles.grid}>
        {skillGroups.map((group) => (
          <article key={group.title} className={styles.group}>
            <h3 className={styles.title}>{group.title}</h3>
            <dl className={styles.rows}>
              {group.rows.map((row) => (
                <div key={row.label} className={styles.row}>
                  <dt>{row.label}</dt>
                  <dd>
                    <ul className={styles.items}>
                      {row.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
            <p className={styles.evidence}>
              <span className={styles.evidenceLabel}>Applied in</span> {group.evidence}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
