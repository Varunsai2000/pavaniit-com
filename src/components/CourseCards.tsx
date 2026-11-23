import Link from "next/link";
import { courseHref, lowerName, type Course } from "@/content/courses";
import { real } from "@/content/site";
import { ArrowText } from "./bits";

/** Course cards: same anatomy as the stage cards, one short link stretched over the card. */
export default function CourseCards({
  items,
  columns = 2,
  level = 3,
}: {
  items: Course[];
  columns?: 2 | 3;
  /** 4 when the cards sit under a track heading. */
  level?: 3 | 4;
}) {
  const Name = level === 4 ? "h4" : "h3";
  return (
    <ul className={columns === 3 ? "course-grid is-three" : "course-grid"}>
      {items.map((c) => {
        // Only facts that are set; the row is left out until one is.
        const meta = [
          { k: "Duration", v: real(c.duration) },
          { k: "Fee", v: real(c.fee) },
        ].filter((m) => m.v);
        return (
          <li key={c.slug}>
            <article className="course-card">
              <Name className="course-name">{c.name}</Name>
              <p className="course-short">{c.short}</p>
              {meta.length > 0 && (
                <dl className="course-meta">
                  {meta.map((m) => (
                    <div key={m.k}>
                      <dt>{m.k}</dt>
                      <dd>{m.v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <Link prefetch={false} className="text-link stage-link" href={courseHref(c)}>
                <ArrowText>{`About the ${lowerName(c)} course`}</ArrowText>
              </Link>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
