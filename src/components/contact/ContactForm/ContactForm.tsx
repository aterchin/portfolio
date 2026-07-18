"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./ContactForm.module.css";

type FormState = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!values.name.trim()) errors.name = "Required.";
    if (!values.email.trim()) errors.email = "Required.";
    else if (!EMAIL_RE.test(values.email)) errors.email = "Enter a valid email.";
    if (!values.message.trim()) errors.message = "Required.";
    else if (values.message.trim().length < 10) errors.message = "Too short.";
    return errors;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as the user types
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className={styles.success}>
        <p className={styles.successHeading}>Message sent.</p>
        <p className={styles.successBody}>
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          className={`${styles.input} ${fieldErrors.name ? styles.inputError : ""}`}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          disabled={state === "submitting"}
        />
        {fieldErrors.name && (
          <span className={styles.fieldError}>{fieldErrors.name}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={`${styles.input} ${fieldErrors.email ? styles.inputError : ""}`}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          disabled={state === "submitting"}
        />
        {fieldErrors.email && (
          <span className={styles.fieldError}>{fieldErrors.email}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Message
        </label>
        <textarea
          className={`${styles.textarea} ${fieldErrors.message ? styles.inputError : ""}`}
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={handleChange}
          disabled={state === "submitting"}
        />
        {fieldErrors.message && (
          <span className={styles.fieldError}>{fieldErrors.message}</span>
        )}
      </div>

      {state === "error" && errorMessage && (
        <p className={styles.formError}>{errorMessage}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
