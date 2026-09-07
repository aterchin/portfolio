import styles from "./Figure.module.css";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  /** Optional art-direction source for viewports at or below 768px. */
  mobileSrc?: string;
}

export function Figure({ src, alt, caption, mobileSrc }: FigureProps) {
  return (
    <figure className={styles.figure}>
      <picture>
        {mobileSrc && (
          <source media="(max-width: 768px)" srcSet={mobileSrc} />
        )}
        <img className={styles.image} src={src} alt={alt} loading="lazy" />
      </picture>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
