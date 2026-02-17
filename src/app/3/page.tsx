'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Playfair_Display, Source_Serif_4 } from 'next/font/google';
import styles from './dispatch.module.css';

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-playfair',
});

const sourceSerif = Source_Serif_4({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-source',
});

const tickerItems = [
  'All systems reporting nominal uptime across the network',
  'Portfolio site updated with latest project entries',
  'Cloudflare edge cache hit ratio exceeds 97% this quarter',
  'New deployment pushed to Vercel \u2014 build successful in 14s',
  'GitHub contribution streak reaches an impressive milestone',
  'Streaming infrastructure upgraded to low-latency configuration',
];

interface WeatherData {
  icon: string;
  temp: string;
  desc: string;
  detail: string;
}

export default function DispatchPage() {
  const [currentDate, setCurrentDate] = useState('');
  const [weather, setWeather] = useState<WeatherData>({
    icon: '\u2601',
    temp: '\u2014\u00B0',
    desc: 'Checking conditions\u2026',
    detail: 'Stand by for report',
  });

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  useEffect(() => {
    fetch('https://wttr.in/?format=j1')
      .then((r) => r.json())
      .then((data) => {
        const current = data.current_condition[0];
        const tempF = current.temp_F;
        const desc = current.weatherDesc[0].value;
        const humidity = current.humidity;
        const windMph = current.windspeedMiles;
        const feelsLike = current.FeelsLikeF;

        const code = parseInt(current.weatherCode);
        let icon = '\u2600';
        if (code >= 176 && code < 300) icon = '\u26C8';
        else if (code >= 300 && code < 400) icon = '\u2602';
        else if (code >= 400 && code < 600) icon = '\u26C6';
        else if (code >= 600 && code < 700) icon = '\u2744';
        else if (code === 116) icon = '\u26C5';
        else if (code === 119 || code === 122) icon = '\u2601';
        else if (code === 113) icon = '\u2600';

        setWeather({
          icon,
          temp: `${tempF}\u00B0F`,
          desc,
          detail: `Feels like ${feelsLike}\u00B0F \u2022 Humidity ${humidity}% \u2022 Wind ${windMph} mph`,
        });
      })
      .catch(() => {
        setWeather({
          icon: '\u2601',
          temp: '\u2014',
          desc: 'Forecast unavailable',
          detail: 'Unable to reach the weather bureau',
        });
      });
  }, []);

  // Duplicate ticker items for seamless scrolling
  const tickerDuped = [...tickerItems, ...tickerItems];

  return (
    <div className={`${playfair.variable} ${sourceSerif.variable} ${styles.page}`}>
      <div className={styles.grainOverlay} />
      <div className={styles.vignetteOverlay} />

      {/* BREAKING NEWS TICKER */}
      <div className={styles.tickerWrap}>
        <span className={styles.tickerLabel}>BREAKING</span>
        <div className={styles.tickerContent}>
          {tickerDuped.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <div className={styles.pageContainer}>
        {/* BACK LINK */}
        <Link href="/" className={styles.backLink}>&larr; Return to Front Page</Link>

        {/* MASTHEAD */}
        <header className={`${styles.masthead} ${styles.fadeIn}`}>
          <div className={styles.mastheadRuleTop} />
          <div className={styles.mastheadDateline}>
            <span>Est. 2024</span>
            <span>Personal Dashboard &mdash; All the Links Fit to Click</span>
            <span>Vol. III, No. 1</span>
          </div>
          <h1 className={styles.mastheadTitle}>The Dispatch</h1>
          <p className={styles.mastheadSubtitle}>Chase Frazier&rsquo;s Personal Hub &mdash; All Services &amp; Links</p>
          <div className={styles.mastheadMeta}>
            <span>{currentDate}</span>
            <span className={styles.mastheadOrnament}>&diams;</span>
            <span>Edition III &bull; Digital Broadsheet</span>
          </div>
        </header>

        {/* ABOVE THE FOLD */}
        <div className={`${styles.sectionHeader} ${styles.fadeIn} ${styles.fadeInD1}`}>
          <span>Above the Fold</span>
          <em className={styles.sectionIcon}>&sect;</em>
        </div>

        <div className={styles.featuredGrid}>
          <a href="https://github.com" target="_blank" rel="noopener" className={`${styles.featuredCard} ${styles.featuredCard1}`}>
            <span className={styles.cardTag}>Development</span>
            <h2>The Complete Source Control Archive</h2>
            <span className={styles.cardUrl}>github.com</span>
            <p className={styles.featuredCardDesc}>Every line of code, every commit message, every branch and merge request &mdash; the authoritative record of all development work, maintained with diligence and version-controlled precision.</p>
            <span className={styles.readMore}>Continue reading &rarr;</span>
          </a>

          <div className={styles.featuredDivider} />

          <a href="https://chasefrazier.dev" target="_blank" rel="noopener" className={`${styles.featuredCard} ${styles.featuredCard2}`}>
            <span className={styles.cardTag}>Personal</span>
            <h2>The Official Portfolio &amp; Works Exhibition</h2>
            <span className={styles.cardUrl}>chasefrazier.dev</span>
            <p className={styles.featuredCardDesc}>An extensively curated collection of professional works, creative endeavors, and technical accomplishments &mdash; presented for public viewing and professional inquiry.</p>
            <span className={styles.readMore}>Continue reading &rarr;</span>
          </a>

          <div className={styles.featuredDivider} />

          <a href="https://dash.cloudflare.com" target="_blank" rel="noopener" className={`${styles.featuredCard} ${styles.featuredCard3}`}>
            <span className={styles.cardTag}>Infrastructure</span>
            <h2>Edge Network &amp; Domain Security Bureau</h2>
            <span className={styles.cardUrl}>dash.cloudflare.com</span>
            <p className={styles.featuredCardDesc}>Standing sentinel at the network&rsquo;s perimeter, this bureau oversees DNS routing, SSL certificates, DDoS mitigation, and content delivery across all managed domains.</p>
            <span className={styles.readMore}>Continue reading &rarr;</span>
          </a>
        </div>

        {/* PULL QUOTE */}
        <div className={`${styles.pullQuote} ${styles.fadeIn} ${styles.fadeInD3}`}>
          <p>&ldquo;Move fast, ship often, and keep your dashboards organized.&rdquo;</p>
          <span className={styles.attribution}>&mdash; The Editor</span>
        </div>

        {/* BELOW THE FOLD */}
        <div className={`${styles.sectionHeader} ${styles.fadeIn} ${styles.fadeInD3}`}>
          <span>Below the Fold</span>
          <em className={styles.sectionIcon}>&para;</em>
        </div>

        <div className={styles.belowFold}>
          {/* COLUMN 1 — Lead stories */}
          <div className={styles.column}>
            <a href="https://hpanel.hostinger.com" target="_blank" rel="noopener" className={`${styles.articleCard} ${styles.leadArticle} ${styles.fadeIn} ${styles.fadeInD3}`}>
              <span className={styles.articleCardTag}>Infrastructure</span>
              <h3>Virtual Private Server Administration</h3>
              <span className={styles.articleCardUrl}>hpanel.hostinger.com</span>
              <p className={`${styles.articleCardDesc} ${styles.leadArticleDesc}`}>Housing the critical machinery of web operations, the Hostinger bureau provides direct access to virtual private server management, resource monitoring, and system-level administration of hosted services.</p>
              <span className={styles.readMore}>Continue reading &rarr;</span>
            </a>

            <a href="https://vercel.com/dashboard" target="_blank" rel="noopener" className={`${styles.articleCard} ${styles.fadeIn} ${styles.fadeInD4}`}>
              <span className={styles.articleCardTag}>Deployment</span>
              <h3>Serverless Deployment Command Center</h3>
              <span className={styles.articleCardUrl}>vercel.com/dashboard</span>
              <p className={styles.articleCardDesc}>The nerve center for all serverless operations, managing builds, previews, and production deployments with automated precision.</p>
              <span className={styles.readMore}>Continue reading &rarr;</span>
            </a>

            <a href="https://solace.chasefrazier.dev" target="_blank" rel="noopener" className={`${styles.articleCard} ${styles.fadeIn} ${styles.fadeInD5}`}>
              <span className={styles.articleCardTag}>Media</span>
              <h3>Live Broadcasting &amp; Streaming Bureau</h3>
              <span className={styles.articleCardUrl}>solace.chasefrazier.dev</span>
              <p className={styles.articleCardDesc}>Live transmissions and on-demand programming delivered direct from the studio to audiences everywhere.</p>
              <span className={styles.readMore}>Continue reading &rarr;</span>
            </a>
          </div>

          <div className={styles.colDivider} />

          {/* COLUMN 2 — Secondary stories */}
          <div className={styles.column}>
            <a href="https://discord.com/app" target="_blank" rel="noopener" className={`${styles.articleCard} ${styles.fadeIn} ${styles.fadeInD4}`}>
              <span className={styles.articleCardTag}>Communications</span>
              <h3>Community Wire &amp; Dispatch</h3>
              <span className={styles.articleCardUrl}>discord.com/app</span>
              <p className={styles.articleCardDesc}>The communications switchboard connecting colleagues, communities, and collaborators in real time.</p>
              <span className={styles.readMore}>Continue reading &rarr;</span>
            </a>

            <a href="https://notion.so" target="_blank" rel="noopener" className={`${styles.articleCard} ${styles.fadeIn} ${styles.fadeInD5}`}>
              <span className={styles.articleCardTag}>Documentation</span>
              <h3>Knowledge Repository &amp; Archives</h3>
              <span className={styles.articleCardUrl}>notion.so</span>
              <p className={styles.articleCardDesc}>A comprehensive documentation headquarters housing notes, wikis, project boards, and institutional memory.</p>
              <span className={styles.readMore}>Continue reading &rarr;</span>
            </a>

            <a href="https://analytics.google.com" target="_blank" rel="noopener" className={`${styles.articleCard} ${styles.fadeIn} ${styles.fadeInD6}`}>
              <span className={styles.articleCardTag}>Intelligence</span>
              <h3>Traffic Intelligence &amp; Data Bureau</h3>
              <span className={styles.articleCardUrl}>analytics.google.com</span>
              <p className={styles.articleCardDesc}>Tabulating visitor counts, mapping user journeys, and measuring engagement across all digital properties.</p>
              <span className={styles.readMore}>Continue reading &rarr;</span>
            </a>
          </div>

          <div className={styles.colDivider} />

          {/* COLUMN 3 — Sidebar */}
          <div className={styles.column}>
            {/* Weather Box */}
            <div className={`${styles.weatherBox} ${styles.fadeIn} ${styles.fadeInD4}`}>
              <h4>Today&rsquo;s Weather</h4>
              <span className={styles.weatherIcon}>{weather.icon}</span>
              <div className={styles.weatherTemp}>{weather.temp}</div>
              <div className={styles.weatherDesc}>{weather.desc}</div>
              <div className={styles.weatherDetail}>{weather.detail}</div>
            </div>

            {/* Quick Reference */}
            <div className={`${styles.sidebarBox} ${styles.fadeIn} ${styles.fadeInD5}`}>
              <h4>Quick Reference</h4>
              <ul className={styles.sidebarList}>
                <li><a href="https://chat.openai.com" target="_blank" rel="noopener">ChatGPT</a><span>AI Bureau</span></li>
                <li><a href="https://open.spotify.com" target="_blank" rel="noopener">Spotify</a><span>Music Desk</span></li>
                <li><a href="https://shower.chasefrazier.dev" target="_blank" rel="noopener">Shower Tracker</a><span>Metrics Div.</span></li>
                <li><a href="https://github.com" target="_blank" rel="noopener">GitHub</a><span>Source Ctrl.</span></li>
                <li><a href="https://vercel.com/dashboard" target="_blank" rel="noopener">Vercel</a><span>Deploys</span></li>
                <li><a href="https://notion.so" target="_blank" rel="noopener">Notion</a><span>Knowledge</span></li>
              </ul>
            </div>

            {/* Index Box */}
            <div className={`${styles.sidebarBox} ${styles.fadeIn} ${styles.fadeInD6}`}>
              <h4>Service Index</h4>
              <ul className={styles.sidebarList}>
                <li><a href="#classified">Development</a> <span>3 links</span></li>
                <li><a href="#classified">Infrastructure</a> <span>2 links</span></li>
                <li><a href="#classified">Personal</a> <span>3 links</span></li>
                <li><a href="#classified">Media</a> <span>2 links</span></li>
                <li><a href="#classified">Intelligence</a> <span>2 links</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* CLASSIFIED SECTION */}
        <div className={styles.classifiedSection} id="classified">
          <div className={`${styles.sectionHeader} ${styles.fadeIn} ${styles.fadeInD6}`}>
            <span>Classified &amp; Directory</span>
            <em className={styles.sectionIcon}>&dagger;</em>
          </div>

          <div className={`${styles.classifiedGrid} ${styles.fadeIn} ${styles.fadeInD7}`}>
            <a href="https://chat.openai.com" target="_blank" rel="noopener" className={styles.classifiedItem}>
              <span className={styles.clName}>ChatGPT</span>
              <span className={styles.clDesc}>Artificial Intelligence Correspondence</span>
            </a>
            <a href="https://open.spotify.com" target="_blank" rel="noopener" className={styles.classifiedItem}>
              <span className={styles.clName}>Spotify</span>
              <span className={styles.clDesc}>Audio Entertainment &amp; Music Library</span>
            </a>
            <a href="https://shower.chasefrazier.dev" target="_blank" rel="noopener" className={styles.classifiedItem}>
              <span className={styles.clName}>Shower Tracker</span>
              <span className={styles.clDesc}>Personal Hygiene Metrics Division</span>
            </a>
            <a href="https://discord.com/app" target="_blank" rel="noopener" className={styles.classifiedItem}>
              <span className={styles.clName}>Discord</span>
              <span className={styles.clDesc}>Communications &amp; Community Wire</span>
            </a>
            <a href="https://analytics.google.com" target="_blank" rel="noopener" className={styles.classifiedItem}>
              <span className={styles.clName}>Analytics</span>
              <span className={styles.clDesc}>Traffic Intelligence &amp; Data Bureau</span>
            </a>
            <a href="https://notion.so" target="_blank" rel="noopener" className={styles.classifiedItem}>
              <span className={styles.clName}>Notion</span>
              <span className={styles.clDesc}>Documentation &amp; Knowledge Repository</span>
            </a>
            <a href="https://solace.chasefrazier.dev" target="_blank" rel="noopener" className={styles.classifiedItem}>
              <span className={styles.clName}>Solace</span>
              <span className={styles.clDesc}>Live Broadcasting &amp; Streaming Bureau</span>
            </a>
            <a href="https://hpanel.hostinger.com" target="_blank" rel="noopener" className={styles.classifiedItem}>
              <span className={styles.clName}>Hostinger</span>
              <span className={styles.clDesc}>Virtual Private Server Administration</span>
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <footer className={`${styles.pageFooter} ${styles.fadeIn} ${styles.fadeInD8}`}>
          <span className={styles.footerOrnament}>&diams; &diams; &diams;</span>
          <p>The Dispatch &bull; A Chase Frazier Production</p>
          <p>All services and links are property of their respective operators</p>
          <p style={{ marginTop: '8px' }}>
            <Link href="/" className={styles.footerReturn}>&larr; Return to Front Page</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
