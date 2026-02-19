'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

const LINKS = [
  { href: '/', label: 'services' },
  { href: '/feeds', label: 'feeds' },
  { href: '/widgets', label: 'widgets' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`${styles.link} ${pathname === l.href ? styles.active : ''}`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
