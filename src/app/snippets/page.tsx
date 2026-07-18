import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { SnippetCard } from "@/components/snippets/SnippetCard/SnippetCard";
import { getSnippets } from "@/lib/mdx";
import styles from "./page.module.css";

export const metadata = { title: "Snippets" };

export default function SnippetsPage() {
  const snippets = getSnippets();

  return (
    <PageWrapper>
      <SectionLabel>Snippets</SectionLabel>
      <div className={styles.grid}>
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.slug} {...snippet} />
        ))}
      </div>
    </PageWrapper>
  );
}
