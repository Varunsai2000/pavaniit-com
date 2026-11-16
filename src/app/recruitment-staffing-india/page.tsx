import type { Metadata } from "next";
import StagePage from "@/components/StagePage";
import { stageById } from "@/content/stages";

const stage = stageById("hire");

export const metadata: Metadata = {
  title: stage.metaTitle,
  description: stage.metaDescription,
  alternates: { canonical: stage.href },
  openGraph: { title: stage.title, description: stage.metaDescription, url: stage.href },
};

const steps = [
  { t: "Role brief", d: "A scoping call, then a written brief with the skills, salary range and location agreed." },
  { t: "Shortlist", d: "Screened candidates with notes, salary expectations and notice periods." },
  { t: "Interviews", d: "You interview and decide. We schedule, collect feedback and keep candidates warm." },
  { t: "Offer and joining", d: "We negotiate the offer and stay in touch through the notice period until day one." },
];

export default function Page() {
  return (
    <StagePage stage={stage}>
      <section className="section ruled" aria-labelledby="how-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="how-title">How a hire runs</h2>
            <p className="lead">The same four steps for permanent and contract roles.</p>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.t}>
                <span className="step-n"><span className="sr-only">Step </span>{i + 1}</span>
                <h3 className="h4">{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </StagePage>
  );
}
