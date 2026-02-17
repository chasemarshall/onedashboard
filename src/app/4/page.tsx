'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { useClock } from '@/hooks/useClock';
import styles from './void.module.css';

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-sans',
});

interface CardData {
  href: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  dataKey?: string;
  large?: boolean;
  featured?: boolean;
  showDot?: boolean;
}

const cards: CardData[] = [
  {
    href: 'https://github.com', name: 'GitHub', desc: 'Source code, repositories & version control',
    dataKey: '1', large: true, featured: true, showDot: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
  },
  {
    href: 'https://chasefrazier.dev', name: 'Portfolio', desc: 'Personal brand, projects & presence',
    dataKey: '2', large: true, featured: true, showDot: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    href: 'https://dash.cloudflare.com', name: 'Cloudflare', desc: 'DNS, security & edge network',
    dataKey: '3', showDot: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    href: 'https://hpanel.hostinger.com', name: 'Hostinger', desc: 'Web hosting & domain management',
    dataKey: '4', showDot: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  },
  {
    href: 'https://solace.chasefrazier.dev', name: 'Solace', desc: 'Streaming & live broadcasts',
    dataKey: '5', showDot: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    href: 'https://vercel.com/dashboard', name: 'Vercel', desc: 'Deployments & serverless infrastructure',
    dataKey: '6', showDot: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 20 2 20"/></svg>,
  },
  {
    href: 'https://shower.chasefrazier.dev', name: 'Shower Tracker', desc: 'Personal wellness logging',
    dataKey: '7',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
  },
  {
    href: 'https://discord.com/app', name: 'Discord', desc: 'Communities & voice',
    dataKey: '8',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/><path d="M8.5 17c1 1 3 2 3.5 2s2.5-1 3.5-2"/><path d="M20.2 17.2c.5-1 .8-3.2.8-5.2 0-4-2.5-7-5-8l-1 2s-1.5-.5-3-.5-3 .5-3 .5l-1-2c-2.5 1-5 4-5 8 0 2 .3 4.2.8 5.2 1.5 2.8 5.5 3.5 7.2 3.5h2c1.7 0 5.7-.7 7.2-3.5z"/></svg>,
  },
  {
    href: 'https://notion.so', name: 'Notion', desc: 'Notes, docs & knowledge base',
    dataKey: '9',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="M9 4v16"/><path d="M14 8h4"/><path d="M14 12h4"/><path d="M14 16h4"/></svg>,
  },
  {
    href: 'https://analytics.google.com', name: 'Analytics', desc: 'Traffic & engagement data',
    dataKey: '0',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  },
  {
    href: 'https://chat.openai.com', name: 'ChatGPT', desc: 'AI-assisted thinking & generation',
    showDot: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
  },
  {
    href: 'https://open.spotify.com', name: 'Spotify', desc: 'Music, playlists & audio',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 15c2-1 4.5-1.2 7-.5"/><path d="M7 12c2.5-1.2 6-1.5 9-.5"/><path d="M6.5 9C9.5 7.5 14 7.2 17.5 8.5"/></svg>,
  },
];

export default function VoidPage() {
  const now = useClock();
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const h12 = h % 12 || 12;
  const ampm = h >= 12 ? 'PM' : 'AM';

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateStr = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const headerTimeStr = `${days[now.getDay()]} ${h12}:${m} ${ampm}`;

  const q = query.toLowerCase().trim();
  const filtered = cards.filter((c) => {
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
  });

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && document.activeElement !== searchRef.current) {
      e.preventDefault();
      searchRef.current?.focus();
      return;
    }

    if (e.key === 'Escape') {
      searchRef.current?.blur();
      setQuery('');
      return;
    }

    // Number keys for quick-launch (only when not typing in search)
    if (document.activeElement === searchRef.current) return;

    if (e.key >= '0' && e.key <= '9') {
      const card = cards.find((c) => c.dataKey === e.key);
      if (card) {
        e.preventDefault();
        window.open(card.href, '_blank', 'noopener,noreferrer');
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={`${cormorant.variable} ${dmSans.variable} ${styles.page}`}>
      <div className={styles.grainOverlay} />

      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <span className={styles.logo}>Void</span>
            <h1 className={styles.headerName}>Chase Frazier</h1>
          </div>
          <div className={styles.goldRule} />
          <div className={styles.headerTime}>{headerTimeStr}</div>
        </header>

        {/* CURRENT */}
        <section className={styles.currentSection}>
          <div className={styles.sectionLabel}>Current</div>
          <div className={styles.liveTime}>
            {h12}:{m}<span className={styles.seconds}>:{s} {ampm}</span>
          </div>
          <div className={styles.liveDate}>{dateStr}</div>
        </section>

        {/* SEARCH */}
        <div className={styles.searchWrapper}>
          <input
            ref={searchRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className={styles.searchHint}>
            Press <kbd>1</kbd>&ndash;<kbd>9</kbd> to quick-launch &middot; <kbd>/</kbd> to search
          </div>
        </div>

        {/* BENTO GRID */}
        <div className={styles.bentoGrid}>
          {filtered.map((card) => (
            <a
              key={card.name}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card}${card.large ? ` ${styles.large}` : ''}${card.featured ? ` ${styles.featured}` : ''}`}
            >
              <div className={styles.cardTop}>
                <div className={styles.cardIcon}>{card.icon}</div>
                {card.showDot && <span className={styles.statusDot} />}
              </div>
              <div>
                <div className={styles.cardName}>{card.name}</div>
                <div className={styles.cardDesc}>{card.desc}</div>
              </div>
              <div className={styles.cardAccent} />
            </a>
          ))}

          {filtered.length === 0 && q && (
            <div className={styles.noResults} style={{ display: 'block' }}>Nothing found</div>
          )}
        </div>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div className={styles.footerRule} />
          <div className={styles.footerInner}>
            <Link href="/" className={styles.backLink}>&larr; hub</Link>
            <span className={styles.footerMark}>Void</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
