import Link from "next/link";
import { Fragment } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { ChicagoFlag } from "@/components/about/ChicagoFlag/ChicagoFlag";
import { getAllNormalizedTags, normalizeTag } from "@/lib/tags";
import styles from "./page.module.css";

export const metadata = {
  title: "About",
};

const STACK = [
  {
    label: "Languages",
    items: ["JavaScript", "PHP", "CSS"],
  },
  {
    label: "Frameworks",
    items: ["React", "WordPress", "Drupal", "Laravel"],
  },
  {
    label: "Infrastructure",
    items: ["Linux", "Apache", "Linode", "MySQL", "Git", "AWS"],
  },
];

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adamterchin/" },
  { label: "GitHub", href: "https://github.com/aterchin" },
];

const TECH_ICONS = [
  { label: "PHP", src: "/images/icon-php.svg" },
  { label: "WordPress", src: "/images/icon-wordpress.svg" },
  { label: "React", src: "/images/icon-react.svg" },
  { label: "Linux", src: "/images/icon-linux.svg" },
] as const;

export default function AboutPage() {
  // Set of URL slugs that already have a /tags/[tag] page from content frontmatter.
  const existingTags = new Set(getAllNormalizedTags());

  return (
    <PageWrapper>
      <SectionLabel>About</SectionLabel>
      <div className={styles.layout}>

        <div className={styles.main}>
          <h1 className={styles.heading}>
            Full-stack developer.<br />
            <span className="text-nowrap">Chicago → Brooklyn.</span>
          </h1>

          <div className={styles.bio}>
            <p className={styles.lead}>I grew up in Chicago.</p>
            <p>
              A suburb, actually — and I spent most of my adult life in the city
              before moving to Brooklyn in 2021.
            </p>
            <ChicagoFlag />
            <h3>Marketing?</h3>
            <p className={styles.drupalMark}>
              I went to school for marketing, which wasn&apos;t the right fit —
              but a Drupal 5 website I put together in 2007 got me hired at a
              wedding website startup, and the developers I worked with there
              made up my mind. I&apos;ve been building for the web ever since.
            </p>
            <h3>Experience?</h3>
            <p>
              I&apos;m self-taught, which means I&apos;ve had to be deliberate
              about how I learn. Back then, it was getting my wrist slapped by
              a lot of bosses and co-workers.  Then a lot of long nights
              reading books and blogs, trying some of the same things on my own.  
              Do it right the first time, don&apos;t repeat yourself, learn from your mistakes, <em>measure twice, 
              cut once.</em> Now I pass along whatever I can.
            </p>
            <h3>AI?</h3>
            <p>
              I have been working out how to use
              AI effectively — not to replace what I know, but to move faster
              and take on things I couldn&apos;t before.  I&apos;m more efficient with
              repetitious tasks and workflows.
            </p>
            <h3>Day-to-day</h3>
            <p>
              I work across the full stack: WordPress front-end
              development, custom PHP plugin work, React applications, and
              sysadmin work on Linux servers across AWS and Linode. I prefer
              small teams, version control taken seriously, and problems that
              require actually thinking about them.
            </p>
            <ul className={styles.techIcons} aria-label="Technologies">
              {TECH_ICONS.map(({ label, src }) => (
                <li
                  key={label}
                  className={styles.techIcon}
                  style={{
                    WebkitMaskImage: `url(${src})`,
                    maskImage: `url(${src})`,
                  }}
                  aria-label={label}
                />
              ))}
            </ul>
          </div>
        </div>

        <aside className={styles.sidebar}>

          <div className={styles.sideSection}>
            <h2 className="side-label">Currently working with</h2>
            <dl className={styles.stack}>
              {STACK.map(({ label, items }) => (
                <div key={label} className={styles.stackGroup}>
                  <dt className={styles.stackLabel}>{label}</dt>
                  <dd className={styles.stackItems}>
                    {items.map((item, i) => {
                      const slug = normalizeTag(item);
                      const href = existingTags.has(slug)
                        ? `/tags/${slug}`
                        : null;

                      return (
                        <Fragment key={item}>
                          {i > 0 && ", "}
                          {href ? (
                            <Link href={href} className={styles.stackLink}>
                              {item}
                            </Link>
                          ) : (
                            item
                          )}
                        </Fragment>
                      );
                    })}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <hr className="squiggle" />

          <div className={styles.sideSection}>
            <h2 className="side-label">Looking for</h2>
            <p className={styles.sideText}>
              Full-time role in New York or remote. Open to contract work.
            </p>
            <Link href="/contact" className={styles.contactLink}>
              Get in touch →
            </Link>
          </div>

          <hr className="squiggle" />

          <div className={styles.sideSection}>
            <h2 className="side-label">Elsewhere</h2>
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
