import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { ExperimentCard } from "@/components/experiments/ExperimentCard/ExperimentCard";
import { getExperiments } from "@/lib/mdx";
import styles from "./page.module.css";

export const metadata = { title: "Experiments" };

export default function ExperimentsPage() {
  const experiments = getExperiments();

  return (
    <PageWrapper>
      <SectionLabel>Experiments</SectionLabel>
      <div className={styles.grid}>
        {experiments.map((experiment) => (
          <ExperimentCard key={experiment.slug} {...experiment} />
        ))}
      </div>
    </PageWrapper>
  );
}
