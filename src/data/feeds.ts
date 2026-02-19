export interface Feed {
  id: string;
  name: string;
  url: string;
  category: string;
}

export const feeds: Feed[] = [
  { id: 'FEED-001', name: 'Hacker News',       url: 'https://hnrss.org/frontpage',                    category: 'tech' },
  { id: 'FEED-002', name: 'TechCrunch',        url: 'https://techcrunch.com/feed/',                   category: 'tech' },
  { id: 'FEED-003', name: 'The Verge',         url: 'https://www.theverge.com/rss/index.xml',         category: 'tech' },
  { id: 'FEED-004', name: 'CSS-Tricks',        url: 'https://css-tricks.com/feed/',                   category: 'dev' },
  { id: 'FEED-005', name: 'Smashing Magazine',  url: 'https://www.smashingmagazine.com/feed/',         category: 'dev' },
  { id: 'FEED-006', name: 'Dev.to',            url: 'https://dev.to/feed',                            category: 'dev' },
];
