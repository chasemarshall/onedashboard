'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { useClock } from '@/hooks/useClock';
import styles from './prism.module.css';

const outfit = Outfit({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-outfit',
});

interface CardData {
  name: string;
  href: string;
  icon: string;
  desc: string;
  keywords: string;
}

const sections: { label: string; key: string; cards: CardData[] }[] = [
  {
    label: 'Development',
    key: 'development',
    cards: [
      { name: 'GitHub', href: 'https://github.com', icon: '\uD83D\uDCBB', desc: 'Repositories & code', keywords: 'github repositories code git' },
      { name: 'Cloudflare', href: 'https://dash.cloudflare.com', icon: '\u2601\uFE0F', desc: 'DNS, CDN & security', keywords: 'cloudflare dns cdn security network' },
      { name: 'Hostinger', href: 'https://hpanel.hostinger.com', icon: '\uD83D\uDDA5\uFE0F', desc: 'VPS management', keywords: 'hostinger vps server hosting management' },
      { name: 'Vercel', href: 'https://vercel.com/dashboard', icon: '\u25B2', desc: 'Deployments', keywords: 'vercel deploy deployments hosting nextjs' },
      { name: 'Analytics', href: 'https://analytics.google.com', icon: '\uD83D\uDCCA', desc: 'Site metrics', keywords: 'analytics google metrics site traffic data' },
    ],
  },
  {
    label: 'Personal',
    key: 'personal',
    cards: [
      { name: 'Portfolio', href: 'https://chasefrazier.dev', icon: '\uD83C\uDF0D', desc: 'Personal website', keywords: 'portfolio personal website chase frazier' },
      { name: 'Solace', href: 'https://solace.chasefrazier.dev', icon: '\uD83C\uDFAC', desc: 'Streaming platform', keywords: 'solace streaming platform video media' },
      { name: 'Shower Tracker', href: 'https://shower.chasefrazier.dev', icon: '\uD83D\uDEBF', desc: 'Daily tracking', keywords: 'shower tracker daily tracking habit' },
      { name: 'Notion', href: 'https://notion.so', icon: '\uD83D\uDCD3', desc: 'Notes & docs', keywords: 'notion notes docs documentation writing' },
    ],
  },
  {
    label: 'Media',
    key: 'media',
    cards: [
      { name: 'Discord', href: 'https://discord.com/app', icon: '\uD83D\uDCAC', desc: 'Community & chat', keywords: 'discord community chat messaging server' },
      { name: 'ChatGPT', href: 'https://chat.openai.com', icon: '\u2728', desc: 'AI assistant', keywords: 'chatgpt openai ai assistant artificial intelligence' },
      { name: 'Spotify', href: 'https://open.spotify.com', icon: '\uD83C\uDFB5', desc: 'Music & playlists', keywords: 'spotify music playlists songs audio' },
    ],
  },
];

const quickActions = [
  { href: 'https://github.com/new', icon: '+', label: 'New Repo' },
  { href: 'https://dash.cloudflare.com', icon: '\uD83C\uDF10', label: 'Check DNS' },
  { href: 'https://vercel.com/new', icon: '\u25B2', label: 'Deploy' },
  { href: 'https://notion.so', icon: '\uD83D\uDCDD', label: 'New Note' },
  { href: 'https://chat.openai.com', icon: '\u2728', label: 'Ask AI' },
];

export default function PrismPage() {
  const now = useClock();
  const [query, setQuery] = useState('');

  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const q = query.toLowerCase().trim();

  // Count total visible cards across all sections
  let globalIndex = 0;
  let anyVisible = false;

  const renderedSections = sections.map((section) => {
    const filteredCards = section.cards.map((card) => {
      const match = !q || card.keywords.includes(q) || card.name.toLowerCase().includes(q);
      const idx = globalIndex++;
      if (match) anyVisible = true;
      return { ...card, match, staggerDelay: 0.3 + idx * 0.06 };
    });

    const sectionVisible = filteredCards.some((c) => c.match);

    return (
      <div
        key={section.key}
        className={`${styles.section} ${!sectionVisible ? styles.sectionHidden : ''}`}
      >
        <div className={styles.sectionLabel}>{section.label}</div>
        <div className={styles.cardsGrid}>
          {filteredCards.map((card) => (
            <a
              key={card.name}
              href={card.href}
              target="_blank"
              rel="noopener"
              className={`${styles.card} ${!card.match ? styles.hidden : ''}`}
              style={{ animationDelay: `${card.staggerDelay}s` }}
            >
              <div className={styles.cardIcon}>{card.icon}</div>
              <div className={styles.cardInfo}>
                <div className={styles.cardName}>{card.name}</div>
                <div className={styles.cardDesc}>{card.desc}</div>
              </div>
              <span className={styles.cardArrow}>&rarr;</span>
            </a>
          ))}
        </div>
      </div>
    );
  });

  return (
    <div className={`${outfit.variable} ${styles.page}`}>
      {/* Aurora Background */}
      <div className={styles.aurora} />

      {/* Floating Orbs */}
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
      <div className={`${styles.orb} ${styles.orb4}`} />
      <div className={`${styles.orb} ${styles.orb5}`} />

      {/* Light Leaks */}
      <div className={`${styles.lightLeak} ${styles.lightLeak1}`} />
      <div className={`${styles.lightLeak} ${styles.lightLeak2}`} />

      {/* Main Content */}
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <Link href="/" className={styles.backLink} title="Back to home">&larr;</Link>
          <div className={styles.clockArea}>
            <div className={styles.clock}>{dateStr}</div>
            <div className={styles.clockTime}>{timeStr}</div>
          </div>
        </header>

        {/* Greeting */}
        <div className={styles.greetingArea}>
          <div className={styles.prismBadge}>PRISM</div>
          <h1 className={styles.greeting}>hey chase</h1>
          <p className={styles.subtitle}>Your dashboard, beautifully organized.</p>
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>&#x1F50D;</span>
            <input
              type="text"
              placeholder="Search services..."
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          {quickActions.map((a) => (
            <a key={a.href} href={a.href} target="_blank" rel="noopener" className={styles.pillBtn}>
              <span className={styles.pillIcon}>{a.icon}</span> {a.label}
            </a>
          ))}
        </div>

        {/* Sections */}
        {renderedSections}

        {/* No Results Message */}
        {!anyVisible && q && (
          <div className={styles.noResults} style={{ display: 'block' }}>
            No services found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
