'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import styles from './page.module.css';

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export default function FeedsPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/feeds')
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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

      {loading ? (
        <div className={styles.loading}>loading feeds...</div>
      ) : items.length === 0 ? (
        <div className={styles.loading}>no feed items found</div>
      ) : (
        <div className={styles.feedList}>
          {items.map((item, i) => (
            <a
              key={`${item.source}-${i}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.feedItem}
            >
              <div className={styles.feedMeta}>
                <span className={styles.feedSource}>{item.source}</span>
                <span className={styles.feedTime}>{timeAgo(item.pubDate)}</span>
              </div>
              <div className={styles.feedTitle}>{item.title}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
