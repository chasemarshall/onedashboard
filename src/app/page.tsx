import type { Metadata } from "next";
import Link from "next/link";
import { Space_Mono, Outfit } from "next/font/google";
import styles from "./page.module.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const outfit = Outfit({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Chase's Hub — Pick a Flavor",
};

const cards = [
  { num: "01", name: "NEXUS", desc: "Cyberpunk terminal. Phosphor green. Scan lines. Command-line energy.", href: "/1", style: "card1" as const },
  { num: "02", name: "PRISM", desc: "Ethereal glass. Aurora gradients. Frosted cards. Soft light.", href: "/2", style: "card2" as const },
  { num: "03", name: "DISPATCH", desc: "Editorial broadsheet. Ink on newsprint. Column grids. Typographic punch.", href: "/3", style: "card3" as const },
  { num: "04", name: "VOID", desc: "Dark luxury. Gold on obsidian. Bento grid. Refined silence.", href: "/4", style: "card4" as const },
];

export default function HubPage() {
  return (
    <div className={`${spaceMono.variable} ${outfit.variable} ${styles.body}`}>
      <div className={styles.grain} />
      <h1 className={styles.title}>chase&apos;s hub</h1>
      <p className={styles.sub}>four flavors — pick one</p>
      <div className={styles.grid}>
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className={`${styles.card} ${styles[c.style]}`}>
            <span className={styles.arrow}>&nearr;</span>
            <div className={styles.num}>{c.num}</div>
            <div className={styles.name}>{c.name}</div>
            <div className={styles.desc}>{c.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
