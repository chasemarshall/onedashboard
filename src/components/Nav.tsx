'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './Nav.module.css';

const LINKS = [
  { href: '/', label: 'services', key: '1' },
  { href: '/feeds', label: 'feeds', key: '2' },
  { href: '/widgets', label: 'widgets', key: '3' },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      const link = LINKS.find((l) => l.key === e.key);
      if (link) {
        e.preventDefault();
        router.push(link.href);
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [router]);

  return (
    <nav className={styles.nav}>
      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`${styles.link} ${pathname === l.href ? styles.active : ''}`}
        >
          <span className={styles.key}>{l.key}</span>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
