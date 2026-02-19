import { feeds } from '@/data/feeds';
import { NextResponse } from 'next/server';

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

async function parseFeed(feed: { name: string; url: string }): Promise<FeedItem[]> {
  try {
    const res = await fetch(feed.url, { next: { revalidate: 600 } });
    const text = await res.text();
    const items: FeedItem[] = [];

    // Simple XML parsing for RSS <item> blocks
    const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
    let match;
    while ((match = itemRegex.exec(text)) !== null && items.length < 5) {
      const block = match[1];
      const title = block.match(/<title[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/s)?.[1] ?? '';
      const link = block.match(/<link[^>]*>(.*?)<\/link>/s)?.[1] ?? '';
      const pubDate = block.match(/<pubDate[^>]*>(.*?)<\/pubDate>/s)?.[1] ?? '';
      if (title) {
        items.push({ title: title.trim(), link: link.trim(), pubDate, source: feed.name });
      }
    }

    // Fallback: try Atom <entry> blocks
    if (items.length === 0) {
      const entryRegex = /<entry[\s>]([\s\S]*?)<\/entry>/gi;
      while ((match = entryRegex.exec(text)) !== null && items.length < 5) {
        const block = match[1];
        const title = block.match(/<title[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/s)?.[1] ?? '';
        const linkMatch = block.match(/<link[^>]*href="([^"]*)"[^>]*\/?>|<link[^>]*>(.*?)<\/link>/s);
        const href = linkMatch?.[1] ?? linkMatch?.[2] ?? '';
        const updated = block.match(/<updated[^>]*>(.*?)<\/updated>/s)?.[1] ?? '';
        if (title) {
          items.push({ title: title.trim(), link: href.trim(), pubDate: updated, source: feed.name });
        }
      }
    }

    return items;
  } catch {
    return [];
  }
}

export async function GET() {
  const results = await Promise.all(feeds.map(parseFeed));
  const allItems = results
    .flat()
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return NextResponse.json(allItems);
}
