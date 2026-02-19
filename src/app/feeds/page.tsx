'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  useEffect(() => {
    fetch('/api/feeds')
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function openArticle(item: FeedItem) {
    const params = new URLSearchParams({
      url: item.link,
      title: item.title,
      source: item.source,
      date: item.pubDate,
    });
    router.push(`/feeds/read?${params.toString()}`);
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
    </div>
  );
}
