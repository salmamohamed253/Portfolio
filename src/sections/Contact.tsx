import { ArrowUpRight, Download, Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import { GitHubIcon, LinkedInIcon } from '../components/BrandIcons';
import { Section } from '../components/Section';
import { profile } from '../data/profile';
import { publicAsset } from '../lib/content';
import styles from './Contact.module.css';

interface Channel {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  download?: boolean;
}

const CHANNELS: Channel[] = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: <Mail size={18} aria-hidden="true" /> },
  {
    label: 'LinkedIn',
    value: profile.linkedin.replace(/^https:\/\/(www\.)?/, ''),
    href: profile.linkedin,
    icon: <LinkedInIcon />,
  },
  {
    label: 'GitHub',
    value: profile.github.replace(/^https:\/\//, ''),
    href: profile.github,
    icon: <GitHubIcon />,
  },
  {
    label: 'CV',
    value: 'Download PDF',
    href: publicAsset(profile.cvFile),
    icon: <Download size={18} aria-hidden="true" />,
    download: true,
  },
];

export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      label="Contact"
      title="Get in touch"
      intro="I’m open to software engineering, full-stack, applied AI and application development roles. Email is the best way to reach me."
    >
      <ul className={styles.channels}>
        {CHANNELS.map((channel) => {
          const external = channel.href.startsWith('http');
          return (
            <li key={channel.label}>
              <a
                className={styles.channel}
                href={channel.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...(channel.download ? { download: '' } : {})}
              >
                <span className={styles.icon}>{channel.icon}</span>
                <span className={styles.text}>
                  <span className={styles.label}>{channel.label}</span>
                  <span className={styles.value}>{channel.value}</span>
                </span>
                <ArrowUpRight size={18} className={styles.arrow} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
