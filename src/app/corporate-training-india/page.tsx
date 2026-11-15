import type { Metadata } from "next";
import StagePage from "@/components/StagePage";
import { stageById } from "@/content/stages";

const stage = stageById("grow");

export const metadata: Metadata = {
  title: stage.metaTitle,
  description: stage.metaDescription,
  alternates: { canonical: stage.href },
  openGraph: { title: stage.title, description: stage.metaDescription, url: stage.href },
};

const tracks = [
  { k: "For engineering teams", v: "Cloud and DevOps, data engineering, full-stack development, and practical use of AI coding and LLM tools. Live sessions, labs on your own stack, and an assessment at the end." },
  { k: "For graduates", v: "Hire-train-deploy cohorts. We select graduates against your role, train them on your stack, and you take on people who can contribute from their first day." },
  { k: "For every employee", v: "POSH awareness sessions, which the POSH Act requires employers to run regularly, plus induction and first-time manager programmes." },
];

export default function Page() {
  return (
    <StagePage stage={stage}>
      <section className="section on-mist" aria-labelledby="tracks-title">
        <div className="wrap depth">
          <div className="heading-stack">
            <h2 className="h2" id="tracks-title">Training that matches what you hire for</h2>
            <p className="lead">
              We build programmes from the skills your teams use every day, so time in training turns into project work.
            </p>
          </div>
          <ul className="depth-list">
            {tracks.map((t) => (
              <li key={t.k}><b>{t.k}</b><p>{t.v}</p></li>
            ))}
          </ul>
        </div>
      </section>
    </StagePage>
  );
}
