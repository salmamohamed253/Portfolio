import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'quiet';
  icon?: ReactNode;
  children: ReactNode;
}

/** A link styled as a button. External links open in a new tab safely. */
export function ButtonLink({ variant = 'secondary', icon, children, className, href, ...rest }: ButtonLinkProps) {
  const external = href?.startsWith('http');
  return (
    <a
      href={href}
      className={`${styles.button} ${styles[variant]} ${className ?? ''}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}
