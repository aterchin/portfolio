import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { ContactForm } from "@/components/contact/ContactForm/ContactForm";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <section className={styles.section}>
        <SectionLabel>Contact</SectionLabel>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <h1 className={styles.heading}>Get in touch.</h1>
            <p className={styles.body}>
              Whether you have a project in mind, a role you think I&apos;d be a
              good fit for, or just want to talk through a technical problem —
              I&apos;m happy to hear it.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </PageWrapper>
  );
}
