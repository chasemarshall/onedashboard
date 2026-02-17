'use client';

import { useState, useEffect, useRef } from 'react';
import { services } from '@/data/services';
import { useClock } from '@/hooks/useClock';
import styles from './page.module.css';

const ACCENTS = [
  '#cba6f7', '#a6e3a1', '#fab387', '#89b4fa',
  '#f5c2e7', '#94e2d5', '#f9e2af', '#74c7ec',
  '#f38ba8', '#b4befe', '#f2cdcd', '#89dceb',
];

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const now = useClock();

  const filtered = services.filter((s) => {
    const q = query.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
  });

  const clock = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;

      if (e.key === '/' && tag !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }

      if (e.key === 'Escape') {
        setQuery('');
        inputRef.current?.blur();
        return;
      }

      if (e.key === 'Enter' && tag !== 'INPUT' && filtered.length > 0) {
        window.open(filtered[0].url, '_blank');
        return;
      }

      if (tag !== 'INPUT' && e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key) - 1;
        if (idx < filtered.length) {
          window.open(filtered[idx].url, '_blank');
        }
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [filtered]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.title}>chase&apos;s dashboard</span>
        <span className={styles.clock}>{clock}</span>
      </header>

      <div className={styles.searchWrap}>
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder="search services..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={styles.grid}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>no services match &quot;{query}&quot;</div>
        ) : (
          filtered.map((s, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                style={{
                  '--accent': accent,
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = accent;
                  el.style.boxShadow = `4px 4px 0 ${accent}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = '#313244';
                  el.style.boxShadow = 'none';
                }}
              >
                {i < 9 && <span className={styles.badge}>{i + 1}</span>}
                <div className={styles.cardName}>{s.name}</div>
                <div className={styles.cardDesc}>{s.desc}</div>
                <div className={styles.cardUrl}>{s.url.replace(/^https?:\/\//, '')}</div>
              </a>
            );
          })
        )}
      </div>

      <footer className={styles.footer}>
        <span>{filtered.length} service{filtered.length !== 1 ? 's' : ''}</span>
        <span>
          <span className={styles.kbd}>/</span> search
          <span className={styles.kbd}>1-9</span> launch
          <span className={styles.kbd}>esc</span> clear
        </span>
      </footer>
    </div>
  );
}
