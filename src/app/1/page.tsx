'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { JetBrains_Mono } from 'next/font/google';
import { services } from '@/data/services';
import { useClock } from '@/hooks/useClock';
import styles from './nexus.module.css';

const jbMono = JetBrains_Mono({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-jb',
});

const ASCII_ART = ` ___   ___  ________      ___    ___  ___  ___   ________
|\\  \\ |\\  \\|\\   ____\\    |\\  \\  /  /||\\  \\|\\  \\ |\\   ____\\
\\ \\  \\\\_\\  \\ \\  \\___|_   \\ \\  \\/  / /\\ \\  \\\\\\  \\\\ \\  \\___|_
 \\ \\   __  \\ \\  \\_____\\   \\ \\    / /  \\ \\  \\\\\\  \\\\ \\_____  \\
  \\ \\  \\ \\  \\ \\  \\__|__|   /    \\/    \\ \\  \\\\\\  \\\\|____|\\  \\
   \\ \\__\\ \\__\\ \\_________\\/  /\\  \\    \\ \\_______\\ ____\\_\\  \\
    \\|__|\\|__|\\|_________/__/ /\\ __\\    \\|_______||\\_________ \\
                         |__|/ \\|__|              \\|_________|`;

const HEADER_TEXT = 'NEXUS v2.4.1 // CHASE_FRAZIER@HUB';

const bootLines = [
  { prefix: '[BOOT]', text: ' Initializing NEXUS kernel...', status: 'ok' as const, extra: '' },
  { prefix: '[SYS ]', text: ' Loading module registry...', status: 'ok' as const, extra: ' 12 modules found' },
  { prefix: '[NET ]', text: ' Establishing encrypted tunnel...', status: 'ok' as const, extra: ' AES-256-GCM' },
  { prefix: '[AUTH]', text: ' User CHASE_FRAZIER authenticated', status: 'ok' as const, extra: ' clearance LEVEL-5' },
  { prefix: '[CORE]', text: ' All subsystems nominal.', status: 'warn' as const, extra: ' Dashboard ready' },
];

function urlDisplay(url: string) {
  return url.replace(/^https?:\/\//, '');
}

const SEP = '\u2500'.repeat(300);

export default function NexusPage() {
  const now = useClock();
  const inputRef = useRef<HTMLInputElement>(null);

  // Typing effect
  const [typedText, setTypedText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);

  // Boot log
  const [bootIndex, setBootIndex] = useState(0);

  // Fake uptime
  const [uptime, setUptime] = useState({ d: 247, h: 14, m: 32 });

  // Fake latency
  const [latency, setLatency] = useState(12);

  // Search
  const [query, setQuery] = useState('');

  // Typing effect
  useEffect(() => {
    if (typedText.length < HEADER_TEXT.length) {
      const timeout = setTimeout(() => {
        setTypedText(HEADER_TEXT.slice(0, typedText.length + 1));
      }, 40 + Math.random() * 30);
      return () => clearTimeout(timeout);
    } else {
      setShowSubtitle(true);
    }
  }, [typedText]);

  // Start typing after 600ms
  useEffect(() => {
    const timeout = setTimeout(() => setTypedText(HEADER_TEXT[0]), 600);
    return () => clearTimeout(timeout);
  }, []);

  // Boot log
  useEffect(() => {
    if (bootIndex < bootLines.length) {
      const timeout = setTimeout(() => {
        setBootIndex((i) => i + 1);
      }, 200 + bootIndex * (120 + Math.random() * 80));
      return () => clearTimeout(timeout);
    }
  }, [bootIndex]);

  // Fake uptime
  useEffect(() => {
    const id = setInterval(() => {
      setUptime((u) => {
        let { d, h, m } = u;
        m++;
        if (m >= 60) { m = 0; h++; }
        if (h >= 24) { h = 0; d++; }
        return { d, h, m };
      });
    }, 60000);
    return () => clearInterval(id);
  }, []);

  // Fake latency
  useEffect(() => {
    const id = setInterval(() => {
      setLatency(8 + Math.floor(Math.random() * 18));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && document.activeElement !== inputRef.current) {
      e.preventDefault();
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Search
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const first = filtered[0];
      if (first) window.open(first.url, '_blank', 'noopener,noreferrer');
    }
    if (e.key === 'Escape') {
      setQuery('');
      inputRef.current?.blur();
    }
  };

  const q = query.toLowerCase().trim();
  const filtered = services.filter((s) =>
    !q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
  );

  const clock = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  return (
    <div className={`${jbMono.variable} ${styles.page}`}>
      <div className={styles.crtOverlay} />
      <div className={styles.scanlines} />
      <div className={styles.screenFlicker} />
      <div className={styles.scanBar} />

      <div className={styles.terminalWrapper}>
        <Link href="/" className={styles.exitLink}>&larr; EXIT TO HUB SELECT</Link>

        <div className={styles.topBar}>
          <div className={styles.headerBlock}>
            <div className={`${styles.titleLine} ${styles.glow}`}>
              <span>
                <span>{typedText}</span>
              </span>
              <span className={styles.cursorBlink} />
            </div>
            <div
              className={styles.subtitleLine}
              style={{ opacity: showSubtitle ? 1 : 0 }}
            >
              CHASE_FRAZIER@HUB &mdash; SESSION ACTIVE &mdash; SECTOR 7G
            </div>
          </div>

          <div className={styles.systemStatus}>
            <div className={styles.statusRow}>
              <span className={styles.statusLabel}>UPTIME:</span>
              <span className={styles.statusValue}>{uptime.d}d {uptime.h}h {uptime.m}m</span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.statusLabel}>SYS_TIME:</span>
              <span className={`${styles.statusValue} ${styles.glow}`}>{clock}</span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.statusLabel}>CONN:</span>
              <span className={styles.statusOnline}>&#9679; ENCRYPTED</span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.statusLabel}>LATENCY:</span>
              <span className={styles.statusValue}>{latency}ms</span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.statusLabel}>NODE:</span>
              <span className={styles.statusValue}>US-EAST-1</span>
            </div>
          </div>
        </div>

        <pre className={styles.asciiHeader} aria-hidden="true">{ASCII_ART}</pre>

        <div className={styles.separator}>{SEP}</div>

        <div className={styles.bootLog}>
          {bootLines.slice(0, bootIndex).map((line, i) => (
            <div key={i}>
              <span className={styles.bootPrefix}>{line.prefix}</span>
              {line.text}
              <span className={line.status === 'ok' ? styles.bootOk : styles.bootWarn}>
                {line.status === 'ok' ? ' [  OK  ]' : ' [ WARN ]'}
              </span>
              <span className={styles.bootPrefix}>{line.extra}</span>
            </div>
          ))}
        </div>

        <div className={styles.moduleCount}>
          LOADED MODULES: <span>{filtered.length}</span> / 12 &mdash; ALL SYSTEMS NOMINAL
        </div>

        <div className={styles.separator}>{SEP}</div>

        <div className={styles.moduleGrid}>
          {filtered.map((m) => (
            <a
              key={m.id}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.moduleCard}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardModId}>[{m.id}]</span>
                <span className={styles.cardStatus}><span className={styles.dot} /> ONLINE</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardName}>{m.name}</div>
                <div className={styles.cardDesc}>{m.desc}</div>
                <div className={styles.cardUrl}>{urlDisplay(m.url)}</div>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && q && (
          <div className={`${styles.noResults} ${styles.visible}`} style={{ display: 'block' }}>
            <div className={styles.noResultsBig}>NO MODULES FOUND</div>
            <div>Query returned 0 results. Adjust search parameters.</div>
          </div>
        )}
      </div>

      <div className={styles.commandPrompt}>
        <span className={styles.promptSymbol}>&gt;</span>
        <input
          ref={inputRef}
          type="text"
          className={styles.promptInput}
          placeholder="type a service name to quick-jump..."
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <span className={styles.promptHint}>[ESC] CLEAR</span>
      </div>
    </div>
  );
}
