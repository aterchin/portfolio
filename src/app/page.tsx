import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { Hero } from "@/components/home/Hero/Hero";
import { ContentList } from "@/components/ui/ContentList/ContentList";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { Tag } from "@/components/ui/Tag/Tag";
import { getExperiments, getProjects, getSnippets } from "@/lib/mdx";
import { getAllDisplayTags } from "@/lib/tags";
import styles from "./page.module.css";

const RECENT_SNIPPET_LIMIT = 6;

export default function Home() {
  const allSnippets = getSnippets();
  const recentSnippets = allSnippets.slice(0, RECENT_SNIPPET_LIMIT);
  const experiments = getExperiments();
  const tags = getAllDisplayTags();
  const projects = getProjects();

  return (
    <PageWrapper>
      <Hero />

      <div className={styles.layout}>
        <div className={styles.main}>
          {recentSnippets.length > 0 && (
            <section className={styles.section}>
              <SectionLabel
                href={
                  allSnippets.length > RECENT_SNIPPET_LIMIT
                    ? "/snippets"
                    : undefined
                }
                actionLabel={
                  allSnippets.length > RECENT_SNIPPET_LIMIT
                    ? "View all →"
                    : undefined
                }
              >
                Snippets
              </SectionLabel>
              <ContentList
                items={recentSnippets.map((snippet) => ({
                  href: `/snippets/${snippet.slug}`,
                  title: snippet.title,
                  summary: snippet.summary,
                  tags: snippet.tags,
                }))}
              />
            </section>
          )}

          {experiments.length > 0 && (
            <section className={styles.section}>
              <SectionLabel>Experiments</SectionLabel>
              <ContentList
                items={experiments.map((experiment) => ({
                  href: `/experiments/${experiment.slug}`,
                  title: experiment.title,
                  summary: experiment.summary,
                  tags: experiment.tags ?? [],
                  badge:
                    experiment.status === "in-progress"
                      ? "In progress"
                      : undefined,
                }))}
              />
            </section>
          )}

          {projects.length > 0 && (
            <section className={styles.section}>
              <SectionLabel href="/work" actionLabel="View all →">
                Selected work
              </SectionLabel>
              <ContentList
                items={projects.map((project) => ({
                  href: `/work/${project.slug}`,
                  title: project.title,
                  summary: project.summary,
                  tags: project.tags,
                }))}
              />
            </section>
          )}
        </div>

        {tags.length > 0 && (
          <aside className={styles.sidebar}>
            <SectionLabel>Tags</SectionLabel>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Tag key={tag} linked>
                  {tag}
                </Tag>
              ))}
            </div>
          </aside>
        )}
      </div>
    </PageWrapper>
  );
}
