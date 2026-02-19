'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.css';

function timeAgo(dateStr: string) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function ReaderContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const url = params.get('url') ?? '';
  const title = params.get('title') ?? '';
  const source = params.get('source') ?? '';
  const date = params.get('date') ?? '';

  useEffect(() => {
    if (!url) return;
    fetch(`/api/article?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((data) => {
        setContent(data.content || 'Could not extract article content.');
        setLoading(false);
      })
      .catch(() => {
        setContent('Failed to load article.');
        setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        router.push('/feeds');
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [router]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => router.push('/feeds')}>
          <span className={styles.backKey}>&larr;</span> back to feeds
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.externalLink}
        >
          open original
        </a>
      </div>

      <div className={styles.meta}>
        <span className={styles.source}>{source}</span>
        <span className={styles.time}>{timeAgo(date)}</span>
      </div>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.url}>
        {url.replace(/^https?:\/\//, '')}
      </div>

      <div className={styles.divider} />

      {loading ? (
        <div className={styles.loading}>extracting article...</div>
      ) : (
        <div className={styles.article}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default function ReaderPage() {
  return (
    <Suspense fallback={<div style={{ padding: '48px', textAlign: 'center', color: '#585b70' }}>loading...</div>}>
      <ReaderContent />
    </Suspense>
  );
}
