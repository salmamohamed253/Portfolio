import { ArrowRight, Download, Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../components/BrandIcons';
import { ButtonLink } from '../components/Button';
import { profile } from '../data/profile';
import { publicAsset } from '../lib/content';
import { href } from '../lib/router';
import styles from './Hero.module.css';

const FOCUS_AREAS = [
  {
    title: 'Business applications',
    body: 'Django platforms that automate HR, Finance and Supply Chain workflows across two group companies.',
  },
  {
    title: 'Applied AI',
    body: 'A hybrid rule-based and generative chatbot, retrieval-augmented generation, and image registration and classification research.',
  },
  {
    title: 'Enterprise systems and data',
    body: 'SAP S/4HANA implementation support, Power BI and Minitab reporting, and Snowflake adoption.',
  },
];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={styles.kicker}>
            <span className={styles.name}>{profile.name}</span>
            <span className={styles.roles}>{profile.roles.join(' · ')}</span>
          </p>
          <h1 id="hero-heading" tabIndex={-1} className={styles.title}>
            I build practical software and AI solutions that connect technology with{' '}
            <span className={styles.accent}>real business problems.</span>
          </h1>
          <p className={styles.lede}>
            I’m an Application Support Engineer at Mazzraty (Al Mana Group) in {profile.location}, with a degree in
            Computer Science with Artificial Intelligence. I build full-stack internal applications, AI-powered tools
            and data pipelines — and I stay close to the people who use them, from requirements through to support.
          </p>
          <div className={styles.actions}>
            <ButtonLink variant="primary" href={href.section('work')} icon={<ArrowRight aria-hidden="true" />}>
              View projects
            </ButtonLink>
            <ButtonLink href={publicAsset(profile.cvFile)} download icon={<Download aria-hidden="true" />}>
              Download CV
            </ButtonLink>
            <ButtonLink variant="quiet" href={href.section('contact')} icon={<Mail aria-hidden="true" />}>
              Contact me
            </ButtonLink>
          </div>
          <ul className={styles.profiles} aria-label="Profiles">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon size={16} />
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon size={16} />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <aside className={styles.focus} aria-label="Focus areas">
          <p className={styles.focusLabel}>What I work on</p>
          <ol className={styles.focusList}>
            {FOCUS_AREAS.map((area, i) => (
              <li key={area.title}>
                <span className={styles.focusIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className={styles.focusTitle}>{area.title}</p>
                  <p className={styles.focusBody}>{area.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
