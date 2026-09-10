import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { Tag } from "@/components/ui/Tag/Tag";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { ToC } from "@/components/notes/ToC/ToC";
import { ContentDate } from "@/components/ui/ContentDate/ContentDate";
import { getNote, getNoteSlugs } from "@/lib/mdx";
import { getMDXComponents, mdxRemoteOptions } from "@/lib/mdxComponents";

export async function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.subtitle ? `${note.title} — ${note.subtitle}` : note.title,
  };
}

export default async function NoteSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const { content, title, subtitle, status, tags, headings, date, updated } = note;
  const isWIP = status === "in-progress";

  const { content: MDXContent } = await compileMDX({
    source: content,
    options: mdxRemoteOptions,
    components: getMDXComponents(),
  });


  return (
    <PageWrapper>
      {/* Label sits above the grid so the ToC can align with the title row */}
      <SectionLabel>Note</SectionLabel>

      <div className="content-layout">
        <div className="content-main">
          <article>
            <header className="content-header">
              <h1 className="content-title">{title}</h1>
              {subtitle && <p className="content-subtitle">{subtitle}</p>}
              <ContentDate date={date} updated={updated} inProgress={isWIP} />
              <div className="content-tags">
                {tags.map((tag) => (
                  <Tag key={tag} linked>{tag}</Tag>
                ))}
              </div>
            </header>
            <div className="prose">{MDXContent}</div>
          </article>
        </div>
        {headings.length > 0 && (
          <aside className="content-sidebar">
            <ToC headings={headings} />
          </aside>
        )}
      </div>
    </PageWrapper>
  );
}
