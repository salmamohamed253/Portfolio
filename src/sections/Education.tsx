import { Section } from '../components/Section';
import { achievements, degree, foundation } from '../data/education';
import { href } from '../lib/router';
import styles from './Education.module.css';

export function Education() {
  return (
    <Section id="education" index="05" label="Education" title="Education and achievements" tone="muted">
      <div className={styles.grid}>
        <div className={styles.degree}>
          <p className={styles.period}>{degree.period}</p>
          <h3 className={styles.title}>{degree.title}</h3>
          <p className={styles.institution}>
            {degree.institution} · {degree.location}
          </p>
          <p className={styles.label}>Key modules</p>
          <ul className={styles.modules}>
            {degree.modules.map((module) => (
              <li key={module}>{module}</li>
            ))}
          </ul>
          <p className={styles.note}>
            Final-year project:{' '}
            <a href={href.project(degree.finalYearProjectSlug)}>
              Image Registration and Classification for Breast Cancer Tissue Staining (H&amp;E and IHC)
            </a>
            . Group project: {degree.groupProject}
          </p>
          <p className={styles.foundation}>
            {foundation.title}, {foundation.institution} · {foundation.period}
          </p>
        </div>

        <div>
          <p className={styles.label}>Achievements and certifications</p>
          <ul className={styles.achievements}>
            {achievements.map((item) => (
              <li key={item.title}>
                <span className={styles.achievementTitle}>{item.title}</span>
                <span className={styles.issuer}>{item.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
