export interface Service {
  id: string;
  name: string;
  url: string;
  desc: string;
}

export const services: Service[] = [
  { id: 'MOD-001', name: 'GitHub',          url: 'https://github.com',              desc: 'source control // repositories' },
  { id: 'MOD-002', name: 'Cloudflare',      url: 'https://dash.cloudflare.com',     desc: 'cdn // dns // edge network' },
  { id: 'MOD-003', name: 'Hostinger VPS',   url: 'https://hpanel.hostinger.com',    desc: 'virtual private server // ssh' },
  { id: 'MOD-004', name: 'Portfolio',        url: 'https://chasefrazier.dev',        desc: 'personal site // portfolio' },
  { id: 'MOD-005', name: 'Solace Stream',    url: 'https://solace.chasefrazier.dev', desc: 'twitch alt // streaming' },
  { id: 'MOD-006', name: 'Shower Tracker',   url: 'https://shower.chasefrazier.dev', desc: 'hygiene metrics // tracker' },
  { id: 'MOD-007', name: 'Vercel',           url: 'https://vercel.com/dashboard',    desc: 'deployments // serverless' },
  { id: 'MOD-008', name: 'Discord',          url: 'https://discord.com/app',         desc: 'comms // voice // chat' },
  { id: 'MOD-009', name: 'Notion',           url: 'https://notion.so',               desc: 'notes // docs // wiki' },
  { id: 'MOD-010', name: 'Google Analytics', url: 'https://analytics.google.com',    desc: 'traffic // metrics // data' },
  { id: 'MOD-011', name: 'ChatGPT',          url: 'https://chat.openai.com',         desc: 'ai assistant // llm' },
  { id: 'MOD-012', name: 'Spotify',          url: 'https://open.spotify.com',        desc: 'audio // music // playlists' },
];
