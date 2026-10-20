import { Section } from '../components/Section';
import { degree } from '../data/education';
import { profile } from '../data/profile';
import styles from './About.module.css';

const FACTS: { label: string; value: string }[] = [
  { label: 'Current role', value: 'Application Support Engineer, Mazzraty (Al Mana Group)' },
  { label: 'Based in', value: profile.location },
  { label: 'Degree', value: `${degree.title}, ${degree.institution} Malaysia` },
  { label: 'Languages', value: profile.languages.join(', ') },
];

export function About() {
  return (
    <Section id="about" index="03" label="About" title="Between the business and the code">
      <div className={styles.grid}>
        <div className={styles.text}>
          <p>
            I studied Computer Science with Artificial Intelligence at the University of Nottingham Malaysia. My
            final-year project applied image processing and machine learning to align and classify breast cancer
            tissue images stained with H&amp;E and IHC.
          </p>
          <p>
            Since April 2025 I have worked as an Application Support Engineer at Mazzraty (Al Mana Group), supporting
            two group companies: Mazzraty (poultry) and AQCDP (dairy). The role combines development with business
            analysis. I act as lead developer for in-house Django platforms, run requirements discovery sessions,
            write functional specifications, and support the systems after they go live.
          </p>
          <p>
            Most of my work starts with an operational process — manual HR records and leave requests, hand-logged
            attendance, monthly sales data spread across branches — and ends with software or reporting the
            department can rely on. I work between business owners, developers and implementation partners, often
            across companies and in multicultural, multilingual teams.
          </p>
        </div>
        <dl className={styles.facts}>
          {FACTS.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
