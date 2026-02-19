'use client';

import { useState, useEffect, useCallback } from 'react';
import Nav from '@/components/Nav';
import styles from './page.module.css';

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

type SortMode = 'newest' | 'oldest' | 'source';

export default function FeedsPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState<string>('all');
  const [sort, setSort] = useState<SortMode>('newest');
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  const [articleContent, setArticleContent] = useState('');
  const [articleLoading, setArticleLoading] = useState(false);

  useEffect(() => {
    fetch('/api/feeds')
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const closeReader = useCallback(() => {
    setSelectedItem(null);
    setArticleContent('');
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && selectedItem) {
        closeReader();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedItem, closeReader]);

  function openArticle(item: FeedItem) {
    setSelectedItem(item);
    setArticleLoading(true);
    setArticleContent('');
    fetch(`/api/article?url=${encodeURIComponent(item.link)}`)
      .then((r) => r.json())
      .then((data) => {
        setArticleContent(data.content || 'Could not extract article content.');
        setArticleLoading(false);
      })
      .catch(() => {
        setArticleContent('Failed to load article.');
        setArticleLoading(false);
      });
  }

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

  const sources = ['all', ...Array.from(new Set(items.map((i) => i.source)))];

  const filtered = items
    .filter((i) => activeSource === 'all' || i.source === activeSource)
    .sort((a, b) => {
      if (sort === 'oldest') return new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime();
      if (sort === 'source') return a.source.localeCompare(b.source);
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.title}>chase&apos;s dashboard</span>
      </header>
      <Nav />

      <div className={styles.pageTitle}>
        <span className={styles.pageName}>rss feeds</span>
        <span className={styles.line} />
      </div>

      {/* Filters */}
      <div className={styles.controls}>
        <div className={styles.sources}>
          {sources.map((s) => (
            <button
              key={s}
              className={`${styles.sourceBtn} ${activeSource === s ? styles.sourceBtnActive : ''}`}
              onClick={() => setActiveSource(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className={styles.sortGroup}>
          <span className={styles.sortLabel}>sort:</span>
          {(['newest', 'oldest', 'source'] as SortMode[]).map((m) => (
            <button
              key={m}
              className={`${styles.sortBtn} ${sort === m ? styles.sortBtnActive : ''}`}
              onClick={() => setSort(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>loading feeds...</div>
      ) : filtered.length === 0 ? (
        <div className={styles.loading}>no feed items found</div>
      ) : (
        <div className={styles.feedList}>
          {filtered.map((item, i) => (
            <button
              key={`${item.source}-${i}`}
              className={styles.feedItem}
              onClick={() => openArticle(item)}
            >
              <div className={styles.feedMeta}>
                <span className={styles.feedSource}>{item.source}</span>
                <span className={styles.feedTime}>{timeAgo(item.pubDate)}</span>
              </div>
              <div className={styles.feedTitle}>{item.title}</div>
            </button>
          ))}
        </div>
      )}

      {/* Reader Overlay */}
      {selectedItem && (
        <div className={styles.readerOverlay} onClick={closeReader}>
          <div className={styles.reader} onClick={(e) => e.stopPropagation()}>
            <div className={styles.readerHeader}>
              <div className={styles.readerMeta}>
                <span className={styles.readerSource}>{selectedItem.source}</span>
                <span className={styles.readerTime}>{timeAgo(selectedItem.pubDate)}</span>
              </div>
              <button className={styles.readerClose} onClick={closeReader}>esc</button>
            </div>
            <h1 className={styles.readerTitle}>{selectedItem.title}</h1>
            <a
              href={selectedItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.readerLink}
            >
              {selectedItem.link.replace(/^https?:\/\//, '')}
            </a>
            <div className={styles.readerDivider} />
            {articleLoading ? (
              <div className={styles.readerLoading}>extracting article...</div>
            ) : (
              <div className={styles.readerContent}>
                {articleContent.split('\n').map((line, i) => (
                  <p key={i}>{line || '\u00A0'}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
