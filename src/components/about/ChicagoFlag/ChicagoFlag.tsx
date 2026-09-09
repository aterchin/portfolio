import styles from "./ChicagoFlag.module.css";

/**
 * Six-pointed star path (Chicago flag style).
 * Same idea as the CodePen canvas drawStar(arms=6): alternate outer/inner
 * radius around the circle. Done in SVG so this stays a Server Component.
 */
function sixPointStarPath(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
): string {
  const arms = 6;
  const angle = Math.PI / arms;
  // Rotate so a point faces up (CodePen used +11 radians as an offset).
  const rotation = -Math.PI / 2;

  const points: string[] = [];
  for (let i = 0; i < arms * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = cx + Math.cos(i * angle + rotation) * r;
    const y = cy + Math.sin(i * angle + rotation) * r;
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return points.join(" ");
}

const STAR_Y = 100;
const STAR_OUTER = 18;
const STAR_INNER = 7.2;
const STAR_XS = [75, 125, 175, 225];

export function ChicagoFlag() {
  return (
    <figure className={styles.figure}>
      <svg
        className={styles.flag}
        viewBox="0 0 300 200"
        role="img"
        aria-label="Flag of Chicago"
      >
        <rect width="300" height="200" fill="#fff" />
        {/* Blue bars: each 1/6 of flag height, per municipal proportions */}
        <rect
          y={200 / 6}
          width="300"
          height={200 / 6}
          fill="var(--color-chicago-flag-blue)"
        />
        <rect
          y={(200 * 4) / 6}
          width="300"
          height={200 / 6}
          fill="var(--color-chicago-flag-blue)"
        />
        {STAR_XS.map((x) => (
          <polygon
            key={x}
            points={sixPointStarPath(x, STAR_Y, STAR_OUTER, STAR_INNER)}
            fill="var(--color-chicago-star-red)"
          />
        ))}
      </svg>
      <figcaption className={styles.caption}>
        Stars adapted from{" "}
        <a
          href="https://codepen.io/andrewmillen/pen/YePgLZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Andrew Millen&apos;s CodePen
        </a>
      </figcaption>
    </figure>
  );
}
