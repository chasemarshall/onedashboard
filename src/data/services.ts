export interface Service {
  id: string;
  name: string;
  url: string;
  desc: string;
  category: 'my-projects' | 'services';
}

export const services: Service[] = [
  // ── My Projects ──
  { id: 'MOD-004', name: 'Portfolio',   url: 'https://chasefrazier.dev',        desc: 'personal site // portfolio',       category: 'my-projects' },
  { id: 'MOD-005', name: 'solace.',     url: 'https://solace.chasefrazier.dev', desc: 'twitch alt // streaming',          category: 'my-projects' },
  { id: 'MOD-006', name: 'Water HQ',    url: 'https://shower.chasefrazier.dev', desc: 'shower timer // family tracker',   category: 'my-projects' },
  { id: 'MOD-013', name: 'Kin',         url: 'https://kin.chasefrazier.dev',    desc: 'family organizer // household',    category: 'my-projects' },

  // ── Services & Tools ──
  { id: 'MOD-001', name: 'GitHub',          url: 'https://github.com',           desc: 'source control // repositories',   category: 'services' },
  { id: 'MOD-002', name: 'Cloudflare',      url: 'https://dash.cloudflare.com',  desc: 'cdn // dns // edge network',       category: 'services' },
  { id: 'MOD-003', name: 'Hostinger VPS',   url: 'https://hpanel.hostinger.com', desc: 'virtual private server // ssh',    category: 'services' },
  { id: 'MOD-007', name: 'Vercel',          url: 'https://vercel.com/dashboard', desc: 'deployments // serverless',        category: 'services' },
  { id: 'MOD-008', name: 'Discord',         url: 'https://discord.com/app',      desc: 'comms // voice // chat',           category: 'services' },
  { id: 'MOD-009', name: 'Notion',          url: 'https://notion.so',            desc: 'notes // docs // wiki',            category: 'services' },
  { id: 'MOD-010', name: 'Google Analytics', url: 'https://analytics.google.com', desc: 'traffic // metrics // data',      category: 'services' },
  { id: 'MOD-011', name: 'ChatGPT',         url: 'https://chat.openai.com',      desc: 'ai assistant // llm',             category: 'services' },
  { id: 'MOD-012', name: 'Spotify',         url: 'https://open.spotify.com',     desc: 'audio // music // playlists',     category: 'services' },
];
