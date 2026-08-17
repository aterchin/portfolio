import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import styles from "./page.module.css";

export const metadata = {
  title: "About",
};

const STACK = [
  {
    label: "Languages",
    items: ["JavaScript", "PHP", "CSS", "SQL"],
  },
  {
    label: "Frameworks",
    items: ["React", "WordPress", "Drupal", "Laravel"],
  },
  {
    label: "Infrastructure",
    items: ["Linux", "Apache", "AWS", "Linode", "MySQL", "MariaDB", "Git"],
  },
];

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adamterchin/" },
  { label: "GitHub", href: "https://github.com/aterchin" },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      <SectionLabel>About</SectionLabel>
      <div className={styles.layout}>

        <div className={styles.main}>
          <h1 className={styles.heading}>
            Full-stack developer.<br />Based in Brooklyn.
          </h1>

          <div className={styles.bio}>
            <p>
              I grew up outside Chicago and spent most of my adult life there
              before moving to Brooklyn in 2021. I went to school for marketing,
              which wasn&apos;t the right fit — but a Drupal 5 website I put
              together in 2007 got me hired at a wedding website startup, and the
              developers I worked with there made up my mind. I&apos;ve been
              building for the web ever since.
            </p>
            <p>
              I&apos;m self-taught, which means I&apos;ve had to be deliberate
              about how I learn. Right now that includes working out how to use
              AI effectively — not to replace what I know, but to move faster
              and take on things I couldn&apos;t before.
            </p>
            <p>
              Day-to-day I work across the full stack: WordPress front-end
              development, custom PHP plugin work, React applications, and
              sysadmin work on Linux servers across AWS and Linode. I prefer
              small teams, version control taken seriously, and problems that
              require actually thinking about them.
            </p>
          </div>
        </div>

        <aside className={styles.sidebar}>

          <div className={styles.sideSection}>
            <h2 className={styles.sideLabel}>Currently working with</h2>
            <dl className={styles.stack}>
              {STACK.map(({ label, items }) => (
                <div key={label} className={styles.stackGroup}>
                  <dt className={styles.stackLabel}>{label}</dt>
                  <dd className={styles.stackItems}>{items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.sideSection}>
            <h2 className={styles.sideLabel}>Looking for</h2>
            <p className={styles.sideText}>
              Full-time role in New York or remote. Open to contract work.
            </p>
            <Link href="/contact" className={styles.contactLink}>
              Get in touch →
            </Link>
          </div>

          <div className={styles.sideSection}>
            <h2 className={styles.sideLabel}>Elsewhere</h2>
            <ul className={styles.links}>
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </aside>
      </div>
    </PageWrapper>
  );
}
