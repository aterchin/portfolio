import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { Hero } from "@/components/home/Hero/Hero";
import { ProjectGrid } from "@/components/home/ProjectGrid/ProjectGrid";
import type { Project } from "@/lib/types";

// Placeholder data — replace with MDX pipeline output once lib/mdx.ts is built
const projects: Project[] = [
  {
    title: "Municipal Water Authority Redesign",
    slug: "municipal-water-authority",
    date: "2022-06-01",
    type: "case-study",
    status: "published",
    tags: ["Drupal", "Linux", "CSS"],
    accent: "seafoam",
    summary:
      "Rebuilt a city-facing Drupal 7 site for a public utilities authority. Migrated content, rebuilt the theme, and handed off a system the client could actually maintain.",
  },
  {
    title: "Small-Batch Coffee Roaster",
    slug: "coffee-roaster",
    date: "2021-03-01",
    type: "showcase",
    status: "published",
    tags: ["WordPress", "WooCommerce"],
    accent: "terracotta",
    summary:
      "E-commerce build for a specialty roaster. Custom theme, subscription integration, and a checkout flow that didn't get in the way of the product.",
  },
  {
    title: "Multi-tenant Server Migration",
    slug: "server-migration",
    date: "2020-11-01",
    type: "case-study",
    status: "published",
    tags: ["Linux", "Apache", "Bash"],
    accent: "yellow",
    summary:
      "Moved twelve client sites from a shared host to a Linode VPS. Apache config, SSL, cron jobs, the works. Zero downtime.",
  },
];

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <ProjectGrid projects={projects} />
    </PageWrapper>
  );
}
